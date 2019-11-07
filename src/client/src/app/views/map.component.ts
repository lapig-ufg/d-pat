import {
  Component,
  Inject,
  Injectable,
  OnInit,
  LOCALE_ID,
  OnDestroy,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { DatePipe } from "@angular/common";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogConfig
} from "@angular/material";

import { Observable } from "rxjs";
import { of } from "rxjs/observable/of";
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  tap,
  switchMap
} from "rxjs/operators";

import BingMaps from "ol/source/BingMaps";
import { unByKey } from "ol/Observable";
import OlObservable from "ol/Observable";
import OlMap from "ol/Map";
import OlXYZ from "ol/source/XYZ";
import OlTileLayer from "ol/layer/Tile";
import TileWMS from "ol/source/TileWMS";
import OlView from "ol/View";
import * as OlProj from "ol/proj";
import TileGrid from "ol/tilegrid/TileGrid";
import * as OlExtent from "ol/extent.js";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import Style from "ol/style/Style";
import Stroke from "ol/style/Stroke";
import VectorSource from "ol/source/Vector";
import Circle from "ol/style/Circle.js";
import Select from "ol/interaction/Select";
import UTFGrid from "ol/source/UTFGrid.js";
import * as _ol_TileUrlFunction_ from "ol/tileurlfunction.js";
import Overlay from "ol/Overlay.js";
import Fill from "ol/style/Fill.js";
import * as Condition from "ol/events/condition.js";
import { Lightbox } from "ngx-lightbox";
import {
  NgxGalleryOptions,
  NgxGalleryImage,
  NgxGalleryAnimation
} from "ngx-image-video-gallery";


const SEARCH_URL = "service/map/search";
const PARAMS = new HttpParams({
  fromObject: {
    format: "json"
  }
});

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) { }

  search(term: string) {
    if (term === "") {
      return of([]);
    }

    return this.http
      .get(SEARCH_URL, { params: PARAMS.set("key", term) })
      .pipe(map(response => response));
  }
}

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  providers: [SearchService],
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  map: OlMap;
  layers: Array<TileWMS>;
  tileGrid: TileGrid;
  projection: OlProj;
  currentZoom: Number;
  regionsLimits: any;
  dataSeries: any;
  dataStates: any;
  dataCities: any;
  chartResultCities;
  periodSelected: any;
  desmatInfo: any;

  optionsTimeSeries: any;
  optionsStates: any;
  optionsCities: any;

  changeTabSelected: "";
  viewWidth = 600;
  viewWidthMobile = 350;
  chartRegionScale: boolean;

  mapbox: any;
  satelite: any;
  estradas: any;
  relevo: any;
  landsat: any;
  descriptor: any;
  valueRegion: any;
  regionFilterDefault: any;
  urls: any;
  dataExtent: any;

  searching = false;
  searchFailed = false;
  msFilterRegion = "";
  selectRegion: any;

  region_geom: any;
  regionSource: any;
  regionTypeFilter: any;

  defaultRegion: any;

  statePreposition = [];

  layersNames = [];
  layersTypes = [];
  basemapsNames = [];
  limitsNames = [];
  LayersTMS = {};
  limitsTMS = {};

  collapseCharts = false;
  collapseLayer = false;

  isFilteredByCity = false;
  isFilteredByState = false;
  selectedIndex: any;
  collapseLegends = false;

  infodata: any;
  fieldPointsStop: any;
  utfgridsource: UTFGrid;
  utfgridlayer: OlTileLayer;
  infoOverlay: Overlay;
  datePipe: DatePipe;

  dataForDialog = {};

  keyForClick: any;
  keyForPointer: any;

  constructor(
    private http: HttpClient,
    private _service: SearchService,
    public dialog: MatDialog
  ) {
    this.projection = OlProj.get("EPSG:900913");
    this.currentZoom = 5.8;
    this.layers = [];

    this.dataSeries = {};

    this.defaultRegion = {
      type: "biome",
      text: "Cerrado",
      value: "Cerrado",
      area_region: 2040047.67930316,
      regionTypeBr: "Bioma"
    };
    this.selectRegion = this.defaultRegion;

    this.urls = [
      'http://o1.lapig.iesa.ufg.br/ows',
      'http://o2.lapig.iesa.ufg.br/ows',
      'http://o3.lapig.iesa.ufg.br/ows',
      'http://o4.lapig.iesa.ufg.br/ows'
      // "http://localhost:5501/ows"
    ];

    this.tileGrid = new TileGrid({
      extent: this.projection.getExtent(),
      resolutions: this.getResolutions(this.projection),
      tileSize: 512
    });

    this.descriptor = {
      groups: []
    };

    this.periodSelected = {
      value: "year=2018",
      Viewvalue: "2017/2018",
      year: 2018
    };

    this.desmatInfo = {
      value: "year=2018",
      Viewvalue: "2017/2018",
      year: 2018
    };

    this.datePipe = new DatePipe("pt-BR");

    this.infodata = { showUTFGridCard: true };

    this.updateCharts();

    this.chartRegionScale = true;

    this.statePreposition = [
      "AL",
      "GO",
      "MT",
      "MS",
      "MG",
      "PE",
      "RO",
      "RR",
      "SC",
      "SP",
      "SE"
    ];
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => (this.searching = true)),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => (this.searchFailed = false)),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        )
      ),
      tap(() => (this.searching = false))
    );

  formatter = (x: { text: string }) => x.text;

  private selectedTimeFromLayerType(layerName) {
    for (let layer of this.layersTypes) {
      if (layer.value == layerName) {
        for (let time of layer.times) {
          if (time.value == layer.timeSelected) {
            return time;
          }
        }
      }
    }

    return undefined;
  }

  private getServiceParams() {
    var params = [];

    if (this.selectRegion.type != "") {
      params.push("type=" + this.selectRegion.type);
      params.push("region=" + this.selectRegion.value);
    }

    var selectedTime = this.selectedTimeFromLayerType(
      "bi_ce_prodes_desmatamento_100_fip"
    );

    if (selectedTime != undefined) {
      params.push("year=" + selectedTime.year);
    }

    var urlParams = "?" + params.join("&");

    return urlParams;
  }

  private updateExtent() {
    var extenUrl = "/service/map/extent" + this.getServiceParams();

    if (this.selectRegion.type != "") {
      var map = this.map;
      this.http.get(extenUrl).subscribe(extentResult => {
        var features = new GeoJSON().readFeatures(extentResult, {
          dataProjection: "EPSG:4326",
          featureProjection: "EPSG:3857"
        });

        this.regionSource = this.regionsLimits.getSource();
        this.regionSource.clear();
        this.regionSource.addFeature(features[0]);

        var extent = features[0].getGeometry().getExtent();
        map.getView().fit(extent, { duration: 1500 });

        this.selectRegion.area_region = extentResult["area_km2"];
      });
    }
  }

  changeTab(event) {
    this.changeTabSelected = event.tab.textLabel;

    if (event.tab.textLabel == "Série Temporal") {
      this.viewWidth = this.viewWidth + 1;
      this.viewWidthMobile = this.viewWidthMobile + 1;
      this.chartRegionScale = true;
    } else if (event.tab.textLabel == "Transições") {
      this.viewWidth = this.viewWidth + 1;
      this.viewWidthMobile = this.viewWidthMobile + 1;
    }
  }

  private updateCharts() {
    var timeseriesUrl = "/service/deforestation/timeseries" + this.getServiceParams();
    var statesUrl = "/service/deforestation/states" + this.getServiceParams();
    var citiesUrl = "/service/deforestation/cities" + this.getServiceParams();

    this.http.get(timeseriesUrl).subscribe(timeseriesResult => {
      this.dataSeries = {
        labels: timeseriesResult["series"].map(element => element.year),
        datasets: [
          {
            label: timeseriesResult["name"],
            data: timeseriesResult["series"].map(element => element.value),
            fill: false,
            borderColor: "#289628"
          }
        ],
        area_antropica: timeseriesResult["indicator"].anthropic,
        percentArea: (((timeseriesResult["indicator"].anthropic / this.selectRegion.area_region) * 100).toFixed(2) + "%").replace(".", ",")
      };

      this.optionsTimeSeries = {
        tooltips: {
          callbacks: {
            label: function (tooltipItem, data) {
              var percent = parseFloat(
                data["datasets"][0]["data"][tooltipItem["index"]]
              ).toLocaleString("de-DE");
              return percent + " km²";
            }
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback: function (value) {
                  return value.toLocaleString("de-DE") + " km²";
                }
              }
            }
          ]
        },
        title: {
          display: false,
          text: "Testing Title",
          fontSize: 16
        },
        legend: {
          position: "bottom"
        }
      };
    });

    if (!this.isFilteredByState) {
      this.http.get(statesUrl).subscribe(statesResult => {
        this.dataStates = {
          labels: statesResult["series"].map(element => element.name),
          datasets: [
            {
              label: "Estados",
              data: statesResult["series"].map(element => element.value),
              fill: true,
              // borderColor: '#333333',
              backgroundColor: "#fd7e14"
            }
          ]
        };

        this.optionsStates = {
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                var percent = parseFloat(
                  data["datasets"][0]["data"][tooltipItem["index"]]
                ).toLocaleString("de-DE");
                return percent + " km²";
              }
            }
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  callback: function (value) {
                    return value.toLocaleString("de-DE") + " km²";
                  }
                }
              }
            ]
          },
          legend: {
            position: "bottom"
          }
        };
      });
    }

    if (!this.isFilteredByCity) {
      this.http.get(citiesUrl).subscribe(citiesResult => {
        this.chartResultCities = citiesResult;
      });
    }
  }

  updateRegion(region) {
    if (region == this.defaultRegion) {
      this.valueRegion = "";
      this.desmatInfo = {
        value: "year=2018",
        Viewvalue: "2017/2018",
        year: 2018
      };
    }

    this.selectRegion = region;

    this.isFilteredByCity = false;
    this.isFilteredByState = false;

    if (this.selectRegion.type == "city") {
      this.msFilterRegion = " county = '" + this.selectRegion.value + "'";
      this.isFilteredByCity = true;
      this.isFilteredByState = true;
      this.selectRegion.regionTypeBr = "Município de ";
    } else if (this.selectRegion.type == "state") {
      this.msFilterRegion = "uf = '" + this.selectRegion.value + "'";
      this.isFilteredByState = true;

      if (this.statePreposition.find(e => e === this.selectRegion.value))
        this.selectRegion.regionTypeBr = "Estado de";
      else if (
        this.selectRegion.value === "BA" ||
        this.selectRegion.value === "PB"
      )
        this.selectRegion.regionTypeBr = "Estado da";
      else this.selectRegion.regionTypeBr = "Estado do";
    } else this.msFilterRegion = "";

    this.updateExtent();
    this.updateSourceAllLayer();
  }

  private getResolutions(projection) {
    var projExtent = projection.getExtent();
    var startResolution = OlExtent.getWidth(projExtent) / 256;
    var resolutions = new Array(22);
    for (var i = 0, ii = resolutions.length; i < ii; ++i) {
      resolutions[i] = startResolution / Math.pow(2, i);
    }
    return resolutions;
  }

  openDialog(): void {
    window.document.body.style.cursor = "auto";
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: window.innerWidth - 150 + "px",
      height: window.innerHeight - 50 + "px",
      data: this.dataForDialog,
    });
  }

  private createMap() {
    this.createBaseLayers();
    this.createLayers();

    this.map = new OlMap({
      target: "map",
      layers: this.layers,
      view: new OlView({
        center: OlProj.fromLonLat([-52, -14]),
        projection: this.projection,
        zoom: this.currentZoom
      }),
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: true
    });

    var style = new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({ color: "#b8714e", width: 1 }),
        stroke: new Stroke({ color: "#7b2900", width: 2 })
      })
    });

    if (
      this.layersNames.find(element => element.selectedType === "bi_ce_prodes_desmatamento_100_fip").visible ||
      this.layersNames.find(element => element.selectedType === "bi_ce_deter_desmatamento_100_fip").visible
    ) {
      var selectOver = new Select({
        condition: Condition.pointerMove,
        layers: [this.fieldPointsStop],
        style: style
      });

      this.map.addInteraction(selectOver);

      this.infoOverlay = new Overlay({
        element: document.getElementById("map-info"),
        offset: [15, 15],
        stopEvent: false
      });

      this.map.addOverlay(this.infoOverlay);

      this.keyForPointer = this.map.on(
        "pointermove",
        this.callbackPointerMoveMap.bind(this)
      );

      this.keyForClick = this.map.on(
        "singleclick",
        this.callbackClickMap.bind(this)
      );
    }
  }

  private callbackPointerMoveMap(evt) {
    var utfgridlayerVisible = this.utfgridlayer.getVisible();
    if (!utfgridlayerVisible || evt.dragging) {
      return;
    }

    // console.log(" tt ", this.layersNames)
    var coordinate = this.map.getEventCoordinate(evt.originalEvent);
    var viewResolution = this.map.getView().getResolution();

    this.utfgridsource.forDataAtCoordinateAndResolution(coordinate, viewResolution, function (data) {
      if (data) {
        window.document.body.style.cursor = "pointer";

        if (this.layersNames.find(element => element.id === "desmatamento_prodes").visible) {
          if (data.origin_table == "prodes") {
            this.infodata = data;
            this.infodata.dataFormatada = this.infodata.data_detec == "" ? "Não Divulgada" : this.datePipe.transform(new Date(this.infodata.data_detec), "dd/MM/yyyy");
            this.infodata.sucept_desmatFormatada = this.infodata.sucept_desmat == "" ? "Não Computada" : ("" + (this.infodata.sucept_desmat * 100).toFixed(2) + "%").replace(".", ",");
            this.infodata.origin_table = this.infodata.origin_table.toUpperCase();
            this.infodata.showUTFGridCard = true;
          }
        }
        if (
          this.layersNames.find(element => element.id === "desmatamento_deter").visible) {
          if (data.origin_table == "deter") {
            this.infodata = data;
            this.infodata.dataFormatada = this.infodata.data_detec == "" ? "Não Divulgada" : this.datePipe.transform(new Date(this.infodata.data_detec), "dd/MM/yyyy");
            this.infodata.sucept_desmatFormatada = this.infodata.sucept_desmat == "" ? "Não Computada" : ("" + (this.infodata.sucept_desmat * 100).toFixed(2) + "%").replace(".", ",");
            this.infodata.origin_table = this.infodata.origin_table.toUpperCase();
            this.infodata.municipio = this.infodata.municipio.toUpperCase();
            this.infodata.showUTFGridCard = true;
          }
        }

        this.infoOverlay.setPosition(data ? coordinate : undefined);
      } else {
        this.infodata.showUTFGridCard = false;
        window.document.body.style.cursor = "auto";
      }
    }.bind(this)
    );
  }

  private callbackClickMap(evt) {
    if (evt.dragging) {
      return;
    }

    var zoom = this.map.getView().getZoom();

    var coordinate = this.map.getEventCoordinate(evt.originalEvent);
    var viewResolution = this.map.getView().getResolution();

    this.utfgridsource.forDataAtCoordinateAndResolution(
      coordinate,
      viewResolution,
      function (data) {
        if (data) {
          //console.log("da - " , data)
          //console.log(OlProj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'))
          this.dataForDialog = data;
          this.dataForDialog.coordinate = coordinate;
          this.dataForDialog.year = this.selectedTimeFromLayerType("bi_ce_prodes_desmatamento_100_fip").year;
          this.dataForDialog.datePipe = this.datePipe;
          this.openDialog();
        }
      }.bind(this)
    );
  }

  private createBaseLayers() {
    this.mapbox = {
      visible: true,
      layer: new OlTileLayer({
        source: new OlXYZ({
          wrapX: false,
          url:
            "https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw"
        }),
        visible: true
      })
    };

    this.satelite = {
      visible: false,
      layer: new OlTileLayer({
        preload: Infinity,
        source: new BingMaps({
          key:
            "VmCqTus7G3OxlDECYJ7O~G3Wj1uu3KG6y-zycuPHKrg~AhbMxjZ7yyYZ78AjwOVIV-5dcP5ou20yZSEVeXxqR2fTED91m_g4zpCobegW4NPY",
          imagerySet: "Aerial"
        }),
        visible: false
      })
    };

    this.estradas = {
      visible: false,
      layer: new OlTileLayer({
        preload: Infinity,
        source: new BingMaps({
          key:
            "VmCqTus7G3OxlDECYJ7O~G3Wj1uu3KG6y-zycuPHKrg~AhbMxjZ7yyYZ78AjwOVIV-5dcP5ou20yZSEVeXxqR2fTED91m_g4zpCobegW4NPY",
          imagerySet: "Road"
        }),
        visible: false
      })
    };

    this.relevo = {
      visible: false,
      layer: new OlTileLayer({
        source: new OlXYZ({
          url:
            "https://server.arcgisonline.com/ArcGIS/rest/services/" +
            "World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}"
        }),
        visible: false
      })
    };

    this.landsat = {
      visible: false,
      layer: new OlTileLayer({
        source: new TileWMS({
          url: "http://mapbiomas-staging.terras.agr.br/wms",
          projection: "EPSG:3857",
          params: {
            LAYERS: "rgb",
            SERVICE: "WMS",
            TILED: true,
            VERSION: "1.1.1",
            TRANSPARENT: "true",
            MAP: "wms/v/staging/classification/rgb.map",
            YEAR: 2017
          },
          serverType: "mapserver",
          tileGrid: this.tileGrid
        }),
        visible: false
      })
    };

    for (let baseName of this.basemapsNames) {
      this.layers.push(this[baseName.value].layer);
    }
  }

  private createLayers() {
    var olLayers: OlTileLayer[] = new Array();

    //layers
    for (let layer of this.layersTypes) {
      this.LayersTMS[layer.value] = this.createTMSLayer(layer);
      this.layers.push(this.LayersTMS[layer.value]);
    }

    //limits
    for (let limits of this.limitsNames) {
      this.limitsTMS[limits.value] = this.createTMSLayer(limits);
      this.layers.push(this.limitsTMS[limits.value]);
    }

    this.regionsLimits = this.createVectorLayer("regions", "#ffea00", 1);
    this.layers.push(this.regionsLimits);

    this.utfgridsource = new UTFGrid({
      tileJSON: this.getTileJSON()
    });

    this.utfgridlayer = new OlTileLayer({
      source: this.utfgridsource
    });

    this.layers.push(this.utfgridlayer);

    this.layers.push();
    this.layers = this.layers.concat(olLayers.reverse());
  }

  private getTileJSON() {
    let prodes = this.layersNames.find(element => element.id === "desmatamento_prodes");
    let deter = this.layersNames.find(element => element.id === "desmatamento_deter");

    if (prodes.visible) {

      if (prodes.selectedType == "bi_ce_prodes_desmatamento_100_fip") {

        let text = "((origin_table = 'prodes' AND " + this.selectedTimeFromLayerType("bi_ce_prodes_desmatamento_100_fip").value + ")"
          + " OR " + "(origin_table = 'deter' AND " + this.selectedTimeFromLayerType("bi_ce_deter_desmatamento_100_fip").value + "))";

        if (this.selectRegion.type === "city") {
          text += " AND county = '" + this.selectRegion.value + "'";
        } else if (this.selectRegion.type === "state") {
          text += " AND uf = '" + this.selectRegion.value + "'";
        }

        return {
          version: "2.2.0",
          grids: [
            this.returnUTFGRID("bi_ce_info_utfgrid_fip", text, "{x}+{y}+{z}")
            // "/service/deforestation/info?layername=bi_ce_info_utfgrid_fip&msfilter=" +
            // text +
            // "&tile={x}+{y}+{z}"
          ]
        };
      }
      else {
        let text = "1=1";

        if (this.selectRegion.type === "city") {
          text += " AND p.county = '" + this.selectRegion.value + "'";
        } else if (this.selectRegion.type === "state") {
          text += " AND p.uf = '" + this.selectRegion.value + "'";
        }

        return {
          version: "2.2.0",
          grids: [
            this.returnUTFGRID("bi_ce_info_utfgrid_pontos_campo_fip", text, "{x}+{y}+{z}")
            // "/service/deforestation/info?layername=bi_ce_info_utfgrid_pontos_campo_fip&msfilter=" +
            // text +
            // "&tile={x}+{y}+{z}"
          ]
        };
      }

    }

    if (deter.visible) {

      if (deter.selectedType == "bi_ce_deter_desmatamento_pontos_campo_fip") {
        //   let text = "((origin_table = 'prodes')" + " OR " + "(origin_table = 'deter' ))";
        let text = "1=1";

        if (this.selectRegion.type === "city") {
          text += " AND p.county = '" + this.selectRegion.value + "'";
        } else if (this.selectRegion.type === "state") {
          text += " AND p.uf = '" + this.selectRegion.value + "'";
        }

        return {
          version: "2.2.0",
          grids: [
            this.returnUTFGRID("bi_ce_info_utfgrid_fip", text, "{x}+{y}+{z}")
            // "/service/deforestation/info?layername=bi_ce_info_utfgrid_pontos_campo_fip&msfilter=" +
            // text +
            // "&tile={x}+{y}+{z}"
          ]
        };
      }
      else {
        let text = "((origin_table = 'prodes' AND " + this.selectedTimeFromLayerType("bi_ce_prodes_desmatamento_100_fip").value + ")"
          + " OR " + "(origin_table = 'deter' AND " + this.selectedTimeFromLayerType("bi_ce_deter_desmatamento_100_fip").value + "))";

        if (this.selectRegion.type === "city") {
          text += " AND county = '" + this.selectRegion.value + "'";
        } else if (this.selectRegion.type === "state") {
          text += " AND uf = '" + this.selectRegion.value + "'";
        }

        return {
          version: "2.2.0",
          grids: [
            this.returnUTFGRID("bi_ce_info_utfgrid_fip", text, "{x}+{y}+{z}")
            // "/service/deforestation/info?layername=bi_ce_info_utfgrid_fip&msfilter=" +
            // text +
            // "&tile={x}+{y}+{z}"
          ]
        };
      }
    }
  }

  private returnUTFGRID(layername, filter, tile){
    return  "/ows?layers=" + layername + "&MSFILTER=" + filter + "&mode=tile&tile=" + tile + "&tilemode=gmap&map.imagetype=utfgrid"
}

  private createTMSLayer(layer) {
    return new OlTileLayer({
      source: new OlXYZ({
        urls: this.parseUrls(layer)
      }),
      tileGrid: this.tileGrid,
      visible: layer.visible,
      opacity: layer.opacity
    });
  }

  private createVectorLayer(layerName, strokeColor, width) {
    return new VectorLayer({
      name: layerName,
      source: new VectorSource(),
      style: [
        new Style({
          stroke: new Stroke({
            color: "#dedede",
            width: width + 1
          })
        }),
        new Style({
          stroke: new Stroke({
            color: strokeColor,
            width: width
          })
        })
      ]
    });
  }

  private parseUrls(layer) {
    var result = [];

    var filters = [];

    if (layer.timeHandler == "msfilter" && layer.times)
      filters.push(layer.timeSelected);
    if (layer.layerfilter) filters.push(layer.layerfilter);
    if (this.regionFilterDefault) filters.push(this.regionFilterDefault);
    if (layer.regionFilter && this.msFilterRegion)
      filters.push(this.msFilterRegion);

    var msfilter = "";
    if (filters.length > 0) msfilter += "&MSFILTER=" + filters.join(" AND ");

    var layername = layer.value;
    if (layer.timeHandler == "layername") layername = layer.timeSelected;

    for (let url of this.urls) {
      result.push(
        url +
        "?layers=" +
        layername +
        msfilter +
        "&mode=tile&tile={x}+{y}+{z}" +
        "&tilemode=gmap" +
        "&map.imagetype=png"
      );
    }
    return result;
  }

  private updateSourceAllLayer() {
    for (let layer of this.layersTypes) {
      this.updateSourceLayer(layer);
    }
  }

  private updateSourceLayer(layer) {
    if (layer["times"]) {
      this.periodSelected = layer["times"].find(
        element => element.value === layer.timeSelected
      );
    }

    if (layer["value"].search("bi_ce_prodes_desmatamento_100_fip") != -1) {
      this.desmatInfo = this.periodSelected;
      this.updateCharts();
    }

    this.handleInteraction();

    var source_layers = this.LayersTMS[layer.value].getSource();
    source_layers.setUrls(this.parseUrls(layer));
    source_layers.refresh();
  }

  baseLayerChecked(base, e) {
    for (let basemap of this.basemapsNames) {
      if (base.value == basemap.value && e.checked) {
        this[base.value].layer.setVisible(true);
        basemap.visible = true;
      } else if (basemap.value != base.value) {
        this[basemap.value].layer.setVisible(false);
        basemap.visible = false;
      } else {
        this[this.descriptor.basemaps[0].defaultBaseMap].layer.setVisible(true);
        if (basemap.value != this.descriptor.basemaps[0].defaultBaseMap) {
          this[basemap.value].layer.setVisible(false);
          this[basemap.value].visible = false;
        }
      }
    }
  }

  groupLayerschecked(layers, e) {
    if (e.checked) {
      this.LayersTMS[layers].setVisible(e.checked);
    } else {
      this.LayersTMS[layers].setVisible(e.checked);
    }
  }

  limitsLayersChecked(layers, e) {
    //limits
    for (let limits of this.limitsNames) {
      if (layers.value == limits.value && e.checked) {
        this.limitsTMS[limits.value].setVisible(true);
        limits.visible = true;
      } else {
        this.limitsTMS[limits.value].setVisible(false);
        limits.visible = false;
      }
    }
  }

  handleInteraction() {
    if (
      this.layersNames.find(element => element.id === "desmatamento_prodes").visible ||
      this.layersNames.find(element => element.id === "desmatamento_deter").visible) {
      if (this.utfgridsource) {
        var tileJSON = this.getTileJSON();

        this.utfgridsource.tileUrlFunction_ = _ol_TileUrlFunction_.createFromTemplates(tileJSON.grids, this.utfgridsource.tileGrid);
        this.utfgridsource.tileJSON = tileJSON;
        this.utfgridsource.refresh();

        this.utfgridlayer.setVisible(true);
      }
    } else if (this.utfgridsource) {
      this.utfgridlayer.setVisible(false);
    }
  }

  changeVisibility(layer, e) {
    for (let layerType of layer.types) {
      this.LayersTMS[layerType.value].setVisible(false);
    }

    if (e != undefined) {
      layer.visible = e.checked;
    }

    this.handleInteraction();

    this.LayersTMS[layer.selectedType].setVisible(layer.visible);
  }

  ngOnInit() {
    this.http.get("service/map/descriptor").subscribe(result => {
      this.descriptor = result;
      this.regionFilterDefault = this.descriptor.regionFilterDefault;

      for (let group of this.descriptor.groups) {
        for (let layer of group.layers) {
          // console.log("lyat  ", layer)
          if (layer.id != "satelite") {
            layer.urlLegend = this.urls[0] + "?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=" + layer.selectedType + "&format=image/png";
            this.layersNames.push(layer);
          }

          for (let layerType of layer.types) {
            layerType.visible = false;
            if (layer.selectedType == layerType.value)
              layerType.visible = layer.visible;

            this.layersTypes.push(layerType);
            this.layersTypes.sort(function (e1, e2) {
              return e2.order - e1.order;
            });
          }
        }
      }

      for (let basemap of this.descriptor.basemaps) {
        for (let types of basemap.types) {
          this.basemapsNames.push(types);
        }
      }

      for (let limits of this.descriptor.limits) {
        for (let types of limits.types) {
          this.limitsNames.push(types);
        }
      }
      this.createMap();
    });
  }
}

@Component({
  selector: "app-map",
  templateUrl: "./dialog-laudo.html",
  styleUrls: ["./map.component.css"]
})
export class DialogOverviewExampleDialog implements OnInit, OnDestroy {
  indexAccordion: number = 0;

  images: any[];
  defaultImg = "";
  urlSentinel: Array<{ src: string; caption: string; thumb: string }> = [];
  vetBfast: Array<{ src: string; caption: string; thumb: string }> = [];
  vetSuscept: Array<{ src: string; caption: string; thumb: string }> = [];
  vetCar: Array<{ src: string; caption: string; thumb: string }> = [];
  dataBfast: any = {};
  dataSuscept: any = {};
  dataCampo: any = [];

  infoDesmat: any = {};
  infoVisita: any = {};
  urlsLandSat: any = [];

  carData: any = [];

  albumLandsat: Array<{ src: string; caption: string; thumb: string }> = [];

  galleryOptions: NgxGalleryOptions[];
  galleryDrones: NgxGalleryImage[];
  galleryCamera: NgxGalleryImage[];
  galleryVideos: NgxGalleryImage[];


  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private _lightbox: Lightbox
  ) {
    this.defaultImg = "";
    this.dataSuscept = {};
    this.dataBfast = {};
    this.urlsLandSat = [];
    this.dataCampo = [];
    this.infoDesmat = {};
    this.infoVisita = {};


    this.initGallery();
  }

  initImages() { }

  initGallery() {
    this.galleryDrones = [];
    this.galleryCamera = [];
    this.galleryVideos = [];
  }

  onNoClick(): void {
    this.cdRef.detach();
    this.dialogRef.close();
  }

  private getServiceParams() {
    let params = [];

    if (this.data != undefined) {
      params.push("origin=" + this.data.origin_table.toLowerCase());
      params.push("gid=" + this.data.gid);

      if (this.data.origin_table.toLowerCase() === "prodes")
        params.push("year=" + this.data.year);
      else {
        params.push("year=2018");
      }
    }

    var urlParams = "?" + params.join("&");

    return urlParams;
  }

  ngOnInit() {
    var fieldPhotosUrl = "/service/map/field/" + this.getServiceParams();

    // console.log("data - ", this.data)
    this.http.get(fieldPhotosUrl).subscribe(
      result => {
        this.infoDesmat = result["info"];

        this.carData = result["car"];
        this.carData.show = result["car"].show

        this.carData.forEach(element => {

          element.metaData.dataRefFormatada = element.metaData.dataRef == "" ? "Não Divulgada" : this.data.datePipe.transform(new Date(element.metaData.dataRef), "dd/MM/yyyy");
          element.metaData.area_car = element.metaData.area_car / 100.0  //converte HA to Km2
          element.metaData.percent = "" + (((element.metaData.area_desmatada / element.metaData.area_car) * 100).toFixed(2) + "%").replace(".", ",")

          element.metaData.percentRL =  "" + (((element.metaData.area_rl / element.metaData.area_reserva_legal_total) * 100).toFixed(2) + "%").replace(".", ",")


          const dcar = {
            src: element.imgsCar.src,
            caption: "CAR: " + element.metaData.cod_car,
            thumb: element.imgsCar.thumb
          };
          this.vetCar.push(dcar);

        });


        const sent = {
          src: result["images"].urlSentinel.src,
          caption: "LandSat " + this.data.year,
          thumb: result["images"].urlSentinel.thumb
        };
        this.urlSentinel.push(sent);

        this.dataCampo = result["ponto_campo"];

        this.urlsLandSat = result["images"].urlsLandSat;
        for (let i = 0; i < this.urlsLandSat.length; i++) {
          const album = {
            src: this.urlsLandSat[i].url,
            caption: "Ano: " + this.urlsLandSat[i].year,
            thumb: this.urlsLandSat[i].thumb
          };

          this.albumLandsat.push(album);
        }

        this.dataBfast = result["images"].urlBfast;
        this.dataBfast.prob_Formatada = this.dataBfast.pct_bfast == null ? "não foi computada" : ("" + this.dataBfast.pct_bfast.toFixed(2) + "%").replace(".", ",");

        const dfast = {
          src: this.dataBfast.urlBfast.src,
          caption: this.dataBfast.prob_Formatada + " do polígono apresentou quebras em sua série temporal.",
          thumb: this.dataBfast.urlBfast.thumb
        };
        this.vetBfast.push(dfast);

        this.dataSuscept = result["images"].suscept;
        this.dataSuscept.sucept_desmatFormatada = this.dataSuscept.prob_suscept == null ? "não foi computada" : ("" + (this.dataSuscept.prob_suscept * 100).toFixed(2) + "%").replace(".", ",");
        const dsuscept = {
          src: this.dataSuscept.urlSuscept.src,
          caption: "Susceptibilidade a Desmatamento: " + this.dataSuscept.sucept_desmatFormatada,
          thumb: this.dataSuscept.urlSuscept.thumb
        };
        this.vetSuscept.push(dsuscept);
      },
      err => {
        console.log("Error: ", err);
      },
      () => {
        // <---- chamada ao finalizar o subscribe.
        this.galleryOptions = [
          {
            width: "100%",
            height: "500px",
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            imageDescription: true,
            previewCloseOnClick: true,
            previewCloseOnEsc: true,
            thumbnailsMoveSize: 4
            // thumbnailsRemainingCount: true
          },
          // max-width 800
          {
            breakpoint: 800,
            width: "100%",
            height: "700px",
            imagePercent: 100,
            thumbnailsPercent: 20,
            thumbnailsMargin: 20,
            thumbnailMargin: 20
          },
          // max-width 400
          {
            breakpoint: 400,
            preview: false
          }
        ];

        for (let index = 0; index < this.dataCampo.length; index++) {
          const element = this.dataCampo[index];

          this.infoVisita = element;
          this.infoVisita.dataFormatada = this.infoVisita.data_visita == "" ? "Não Divulgada" : this.data.datePipe.transform(new Date(this.infoVisita.data_visita), "dd/MM/yyyy");


          for (let foto = 0; foto < element.fotos_camera.length; foto++) {
            this.galleryCamera.push({
              small: '/service/map/field/fotos_camera/' + element.campo_id + '/' + element.fotos_camera[foto],
              medium: '/service/map/field/fotos_camera/' + element.campo_id + '/' + element.fotos_camera[foto],
              big: '/service/map/field/fotos_camera/' + element.campo_id + '/' + element.fotos_camera[foto],
            });
          }

          for (let foto = 0; foto < element.fotos_drone.length; foto++) {
            this.galleryDrones.push({
              small: '/service/map/field/fotos_drone/' + element.campo_id + '/' + element.fotos_drone[foto],
              medium: '/service/map/field/fotos_drone/' + element.campo_id + '/' + element.fotos_drone[foto],
              big: '/service/map/field/fotos_drone/' + element.campo_id + '/' + element.fotos_drone[foto]
            });
          }

          for (let video = 0; video < element.videos_drone.length; video++) {
            this.galleryVideos.push({
              small: '/service/map/field/videos_drone/' + element.campo_id + '/' + element.videos_drone[video],
              medium: '/service/map/field/videos_drone/' + element.campo_id + '/' + element.videos_drone[video],
              big: '/service/map/field/videos_drone/' + element.campo_id + '/' + element.videos_drone[video]
            });
          }
        }
      }
    );
  }

  ngOnDestroy() {
    this.cdRef.detach(); // do this
  }

  openImage(index: number): void {
    // open lightbox
    this._lightbox.open(this.albumLandsat, index);
  }

  closeImage(): void {
    // close lightbox programmatically
    this._lightbox.close();
  }

  openLightboxSentinel(): void {
    this._lightbox.open(this.urlSentinel);
  }

  openLightboxSuscept(): void {
    this._lightbox.open(this.vetSuscept);
  }

  openLightboxBfast(): void {
    this._lightbox.open(this.vetBfast);
  }
  openLightboxCAR(index: number): void {
    this._lightbox.open(this.vetCar, index);
  }
}
