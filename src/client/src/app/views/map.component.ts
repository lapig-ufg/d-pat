import { DatePipe, DecimalPipe } from '@angular/common';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, HostListener, Inject, Injectable, OnDestroy, OnInit, ElementRef, ViewChild, AfterViewChecked } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MatTabGroup } from "@angular/material";
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-image-video-gallery';
import { Lightbox } from 'ngx-lightbox';
import * as OlExtent from 'ol/extent.js';
import GeoJSON from 'ol/format/GeoJSON';
import { defaults as defaultControls, Control, Attribution } from 'ol/control';
import { defaults as defaultInteractions } from 'ol/interaction';
import OlTileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OlMap from 'ol/Map';
import Overlay from 'ol/Overlay.js';
import * as OlProj from 'ol/proj';
import BingMaps from 'ol/source/BingMaps';
import TileWMS from 'ol/source/TileWMS';
import UTFGrid from 'ol/source/UTFGrid.js';
import VectorSource from 'ol/source/Vector';
import OlXYZ from 'ol/source/XYZ';
import Circle from 'ol/style/Circle.js';
import Fill from 'ol/style/Fill.js';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import TileGrid from 'ol/tilegrid/TileGrid';
import * as _ol_TileUrlFunction_ from 'ol/tileurlfunction.js';
import OlView from 'ol/View';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { MetadataComponent } from './metadata/metadata.component';
import { Router, ActivatedRoute, Routes } from '@angular/router';
import { saveAs } from 'file-saver';
import { GoogleAnalyticsService } from '../services/google-analytics.service';
import * as jsPDF from 'jspdf';
import logos from './logos';
import * as moment from 'moment';
import * as Chart from 'chart.js'
import { TranslateService } from '@ngx-translate/core';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { RegionReportComponent } from './region-report/region-report.component';
import { RegionReportMobileComponent } from './region-report-mobile/region-report-mobile.component';
import { ReportCarComponent } from './report-car/report-car.component';
import { ChartsComponent } from "./charts/charts.component";
import { MobileComponent } from "./mobile/mobile.component";
import { ProjectComponent } from "./project/project.component";
import { MapMobileComponent } from "./map-mobile/map-mobile.component";
import {TutorialsComponent} from "./tutorials/tutorials.component";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare let html2canvas: any;

let SEARCH_URL = '/service/map/search';
let SEARCH_REGION = '/service/map/searchregion';
let PARAMS = new HttpParams({
  fromObject: {
    format: 'json'
  }
});

@Injectable()
export class SearchService {
  constructor(private http: HttpClient) { }

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(SEARCH_URL, { params: PARAMS.set('key', term) })
      .pipe(map(response => response));
  }
}

@Injectable()
export class SearchRegionService {
  constructor(private http: HttpClient) { }

  search(term: string, type: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get(SEARCH_REGION, { params: PARAMS.set('key', term).set('type', type) })
      .pipe(map(response => response));
  }
}

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  providers: [SearchService],
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewChecked {
  map: OlMap;
  layers: Array<TileWMS>;
  tileGrid: TileGrid;
  projection: OlProj;
  currentZoom: Number;
  regionsLimits: any;
  dataSeries: any;
  dataStates: any;
  dataCities: any;
  chartResultCities: any;
  chartResultCitiesIllegalAPP: any;
  chartResultCitiesIllegalRL: any;
  chartUsoSolo = [] as any;
  periodSelected: any;
  desmatInfo: any;

  activeIndexLateralAccordion: any
  googlemaps: any
  optionsTimeSeries: any;
  optionsStates: any;
  optionsCities: any;

  changeTabSelected = "";
  viewWidth = 600;
  viewWidthMobile = 350;
  chartRegionScale: boolean;

  textOnDialog: any;
  mapbox: any;
  satelite: any;
  estradas: any;
  relevo: any;
  landsat: any;
  descriptor: any;
  valueRegion: any;
  regionFilterDefault: any;
  urls: any;

  searching = false;
  searchFailed = false;
  msFilterRegion = '';
  selectRegion: any;

  httpOptions: any;

  region_geom: any;
  regionSource: any;
  regionTypeFilter: any;

  defaultRegion: any;
  defaultPeriod: any;

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
  // @ViewChild("matgroup", { static: false }) matgroup: MatTabGroup;
  collapseLegends = false;

  infodata: any;
  infodataDeter: any;
  infodataCampo: any;
  infodataMunicipio: any;
  infodataABC: any;
  fieldPointsStop: any;
  utfgridsource: UTFGrid;
  utfgridlayer: OlTileLayer;
  utfgridsourceDeter: UTFGrid;
  utfgridlayerDeter: OlTileLayer;
  utfgridCampo: UTFGrid;
  utfgridlayerCampo: OlTileLayer;
  utfgridmunicipio: UTFGrid;
  utfgridlayerMunicipio: OlTileLayer;
  utfgridabc: UTFGrid;
  utfgridlayerabc: OlTileLayer;
  infoOverlay: Overlay;
  datePipe: DatePipe;
  dataForDialog = {} as any;

  keyForClick: any;
  keyForPointer: any;
  currentData: any;
  language: any;

  mapForABC: any = [];
  mapForProducao: any = [];

  titlesLayerBox: any;
  minireportText: any;
  descriptorText: any;

  bntStylePOR: any;
  bntStyleENG: any;

  styleSelected: any;
  styleDefault: any;

  /** Variables for upload shapdefiles **/
  layerFromUpload: any = {
    label: null,
    layer: null,
    checked: false,
    visible: null,
    loading: false,
    dragArea: true,
    error: false,
    strokeColor: '#2224ba',
    token: '',
    analyzedAreaLoading: false,
    analyzedArea: {},
  };

  loadingPrintReport: boolean;

  layerFromConsulta: any = {
    label: null,
    layer: null,
    checked: false,
    visible: null,
    loading: false,
    dragArea: true,
    error: false,
    strokeColor: '#257a33',
    token: '',
    analyzedAreaLoading: false,
    analyzedArea: {},
  };

  selectedIndexConteudo: number;
  selectedIndexUpload: number;

  innerHeigth: any;
  showDrawer: boolean;
  controls: any;
  showTips:boolean;
  showStatistics: boolean;
  loadingsDownload: boolean;
  breakpointMobile: number;
  languages: any = {};
  constructor(
    private http: HttpClient,
    private _service: SearchService,
    public dialog: MatDialog,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    public googleAnalyticsService: GoogleAnalyticsService,
    public router: Router,
    public route: ActivatedRoute,
    private decimalPipe: DecimalPipe,
    public translate: TranslateService,
    protected changeDetector: ChangeDetectorRef
  ) {
    translate.addLangs(['en', 'pt-br']);
    translate.setDefaultLang('pt-br');

    this.projection = OlProj.get('EPSG:900913');
    this.currentZoom = 5.3;
    this.layers = [];

    this.dataSeries = {};
    this.dataStates = {};

    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    this.chartResultCities = {
      split: []
    };
    this.chartResultCitiesIllegalAPP = {};
    this.chartResultCitiesIllegalRL = {};
    this.chartUsoSolo = [];

    this.defaultRegion = {
      type: 'biome',
      text: 'Cerrado',
      value: 'Cerrado',
      area_region: 2040047.67930316,
      regionTypeBr: 'Bioma'
    };
    this.selectRegion = this.defaultRegion;

    this.textOnDialog = {};

    this.currentData = '';
    this.valueRegion = {
      text: ''
    };

    this.changeTabSelected = "";

    this.urls = [
      'https://o1.lapig.iesa.ufg.br/ows',
      'https://o2.lapig.iesa.ufg.br/ows',
      'https://o3.lapig.iesa.ufg.br/ows',
      'https://o4.lapig.iesa.ufg.br/ows'
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
      value: 'year=2019',
      Viewvalue: '2018/2019',
      year: 2019
    };

    this.defaultPeriod = {
      value: 'year=2019',
      Viewvalue: '2018/2019',
      year: 2019
    };

    this.desmatInfo = {
      value: 'year=2019',
      Viewvalue: '2018/2019',
      year: 2019
    };
    this.datePipe = new DatePipe('pt-BR');

    this.styleSelected = {
      'background-color': '#fe8321'
    };

    this.styleDefault = {
      'background-color': '#707070'
    };

    this.languages['pt'] = 'pt-br';
    this.languages['en'] = 'en-us';
    this.languages['pt-br'] = 'pt';
    this.languages['en-us'] = 'en';

    let browserLang = translate.getBrowserLang();

    translate.use(browserLang.match(/en|pt-br/) ? browserLang : 'en');

    this.language = this.languages[browserLang];

    this.setStylesLangButton();
    this.mapForABC = new Map([
      ["RPD", {
        "pt-br": "Recuperação de Pastagens Degradada (RPD)",
        "en-us": "Degraded Pasture Recovery (RPD)"
      }],
      ["ILPF", {
        "pt-br": "Integração Lavoura Pecuária Floresta (ILPF)",
        "en-us": "Forestry Livestock Integration (ILPF)"
      }],
      ["FP", {
        "pt-br": "Floresta Plantada (FP)",
        "en-us": "Planted Forest (FP)"
      }], ["SPD", {
        "pt-br": "Sistema de Plantio Direto (SPD)",
        "en-us": "No-Tillage System (SPD)"
      }]
    ]);

    this.mapForProducao = new Map([
      ["GADO LEITEIRO", {
        "pt-br": "Criação de Gado Leiteiro",
        "en-us": "Dairy Cattle"
      }],
      ["FLORESTA", {
        "pt-br": "Floresta",
        "en-us": "Forest"
      }],
      ["GADO DE CORTE", {
        "pt-br": "Criação de Gado de Corte",
        "en-us": "Beef Cattle Breeding"
      }],
      ["AGRICULTURA", {
        "pt-br": "Agricultura",
        "en-us": "Agriculture"
      }],
      ["ARRENDAMENTO", {
        "pt-br": "Área para Arrendamento",
        "en-us": "Lease Area"
      }],
      ["ARRENDATARIO", {
        "pt-br": "Área para Arrendantário",
        "en-us": "Tenant Area"
      }],
      ["PECUARIA", {
        "pt-br": "Pecuária",
        "en-us": "Livestock"
      }]
    ]);

    this.updateCharts();
    this.chartRegionScale = true;
    this.titlesLayerBox = {};
    this.minireportText = {};

    this.updateTexts();

    this.showDrawer = false;
    this.showStatistics = false;
    this.controls = {};
    this.updateControls();
    this.loadingsDownload = false;
    this.loadingPrintReport = false;

    this.selectedIndexConteudo = 0;
    this.selectedIndexUpload = 0;
    this.breakpointMobile = 1024;
    this.showTips = false;
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
    )

  formatter = (x: { text: string }) => x.text;

  onCityRowSelect(event) {
    let name = event.data.name;

    this.http.get(SEARCH_URL, { params: PARAMS.set('key', name) }).subscribe(result => {
      let ob: any = { text: '' };

      if (Array.isArray(result)) {
        for (let item of result) {
          if (name.toUpperCase() === item.value.toUpperCase()) {
            ob = item;
          }
        }
      }
      else {
        ob = result
      }
      this.currentData = ob.text;
      this.updateRegion(ob);

    });
  };

  onStateSelect(e) {
    let name = e.element._model.label;


    PARAMS.append('key', name)
    PARAMS.append('type', 'state')
    this.http.get(SEARCH_REGION, { params: PARAMS.set('key', name).set('type', 'state') }).subscribe(result => {
      let ob: any = { text: '' };

      if (Array.isArray(result)) {
        for (let item of result) {
          if (name.toUpperCase() === item.value.toUpperCase()) {
            ob = item;
          }
        }
      } else {
        ob = result
      }

      this.currentData = ob.text;
      this.updateRegion(ob);

    });
  }

  private selectedTimeFromLayerType(layerName) {
    for (let layer of this.layersTypes) {
      if (layer.value == layerName) {
        if (layer.hasOwnProperty('times')) {
          for (let time of layer.times) {
            if (time.value == layer.timeSelected) {
              return time;
            }
          }
        }

      }
    }

    return undefined;
  }

  private getServiceParams() {
    let params = [];

    if (this.selectRegion.type != '') {
      params.push('type=' + this.selectRegion.type);
      params.push('region=' + this.selectRegion.value);
    }


    let selectedTime = this.selectedTimeFromLayerType('bi_ce_prodes_desmatamento_100_fip');

    let prodes = this.layersNames.find(element => element.id === 'desmatamento_prodes');
    if (prodes != undefined) {
      selectedTime = this.selectedTimeFromLayerType(prodes.selectedType);
    }

    if (selectedTime != undefined) {
      params.push('year=' + selectedTime.year);
    }
    else {
      params.push('year=' + this.desmatInfo.year);
    }

    params.push('lang=' + this.language);

    let urlParams = '?' + params.join('&');


    return urlParams;
  }

  private updateExtent() {
    let extenUrl = '/service/map/extent' + this.getServiceParams();

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

    if (event.tab.textLabel == "Série Temporal" || event.tab.textLabel == "Timeseries") {
      this.viewWidth = this.viewWidth + 1;
      this.viewWidthMobile = this.viewWidthMobile + 1;
      this.chartRegionScale = true;

      let uso_terra = this.layersNames.find(element => element.id === "terraclass");
      uso_terra.visible = false;

      let agricultura = this.layersNames.find(element => element.id === "agricultura");
      agricultura.visible = false;

      this.changeVisibility(uso_terra, undefined)
      this.changeVisibility(agricultura, undefined)

    } else if (event.tab.textLabel == "Uso do Solo" || event.tab.textLabel == "Land Use and Land Cover") {
      this.viewWidth = this.viewWidth + 1;
      this.viewWidthMobile = this.viewWidthMobile + 1;

    }
    // this.googleAnalyticsService.eventEmitter("changeTab", "charts", this.changeTabSelected);
  }

  changeLanguage(lang) {

    let zoom = this.map.getView().getZoom();

    if (this.language != (lang)) {
      this.language = lang;


      this.setStylesLangButton();
      this.updateTexts();
      this.updateCharts();
      this.updateControls();
      this.updateDescriptor();
    }
  }


  private setStylesLangButton() {

    if (this.language == 'pt-br') {
      this.bntStyleENG = this.styleDefault;
      this.bntStylePOR = this.styleSelected;
    }
    else {
      this.bntStyleENG = this.styleSelected;
      this.bntStylePOR = this.styleDefault;
    }

  }

  private updateTexts() {
    let titlesUrl = '/service/map/titles' + this.getServiceParams();

    this.http.get(titlesUrl).subscribe(titlesResults => {

      this.titlesLayerBox = titlesResults['layer_box'];
      this.titlesLayerBox.legendTitle = titlesResults['legendTitle'];
      this.titlesLayerBox.region_tooltip = titlesResults['region_report_tooltip'];
      this.minireportText = titlesResults['utfgrid'];
      this.descriptorText = titlesResults['descriptor'];

    });

    let textlangurl = '/service/report/textreport?lang=' + this.language;

    this.http.get(textlangurl).subscribe(
      result => {
        this.textOnDialog = result;
      });

  }

  private updateControls() {
    let extenUrl = '/service/map/controls' + this.getServiceParams();
    this.http.get(extenUrl).subscribe(result => {
      this.controls = result;
    });
  }

  private updateCharts() {
    let timeseriesUrl = '/service/deforestation/timeseries' + this.getServiceParams();
    let statesUrl = '/service/deforestation/states' + this.getServiceParams();
    let citiesUrl = '/service/deforestation/cities' + this.getServiceParams();
    let citiesIllegal = '/service/deforestation/illegal' + this.getServiceParams();
    let urlUsoSolo = '/service/deforestation/indicators' + this.getServiceParams();

    this.http.get(timeseriesUrl).subscribe(timeseriesResult => {

      this.dataSeries = {
        title: timeseriesResult['title'],
        labels: timeseriesResult['series'].map(element => element.year),
        datasets: [
          {
            label: timeseriesResult['name'],
            data: timeseriesResult['series'].map(element => element.value),
            fill: false,
            borderColor: '#289628',
            backgroundColor: '#289628'
          }
        ],
        area_antropica: timeseriesResult['indicator'].anthropic,
        description: timeseriesResult['getText'],
        label: timeseriesResult['label'],
        type: timeseriesResult['type'],
        pointStyle: 'rect'

      };

      this.optionsTimeSeries = {
        tooltips: {
          callbacks: {
            label(tooltipItem, data) {
              let percent = parseFloat(
                data['datasets'][0]['data'][tooltipItem['index']]
              ).toLocaleString('de-DE');
              return percent + ' km²';
            }
          }
        },
        scales: {
          yAxes: [
            {
              ticks: {
                callback(value) {
                  return value.toLocaleString('de-DE') + ' km²';
                }
              }
            }
          ]
        },
        title: {
          display: false,
          fontSize: 14
        },
        legend: {
          labels: {
            usePointStyle: true,
            fontSize: 14
          },
          onHover(event) {
            event.target.style.cursor = 'pointer';
          },
          onLeave(event) {
            event.target.style.cursor = 'default';
          },
          position: 'bottom'
        }
      };
    });

    if (!this.isFilteredByState) {
      this.http.get(statesUrl).subscribe(statesResult => {
        this.dataStates = {
          labels: statesResult['series'].map(element => element.name),
          datasets: [
            {
              label: statesResult['nameChart'],
              data: statesResult['series'].map(element => element.value),
              fill: true,
              // borderColor: '#333333',
              backgroundColor: '#DAA520'
            }
          ],
          description: statesResult['description'],
          label: statesResult['label'],
          pointStyle: 'rect'
        };

        this.optionsStates = {
          tooltips: {
            callbacks: {
              label(tooltipItem, data) {
                let percent = parseFloat(
                  data['datasets'][0]['data'][tooltipItem['index']]
                ).toLocaleString('de-DE');
                return percent + ' km²';
              }
            }
          },
          scales: {
            xAxes: [
              {
                ticks: {
                  callback(value) {
                    return value.toLocaleString('de-DE') + ' km²';
                  }
                }
              }
            ]
          },
          legend: {
            position: 'bottom',
            labels: {
              usePointStyle: true,
              fontSize: 12
            },
            onHover(event) {
              event.target.style.cursor = 'pointer';
            },
            onLeave(event) {
              event.target.style.cursor = 'default';
            }
          }
        };
      });
    }

    if (!this.isFilteredByCity) {
      this.http.get(citiesUrl).subscribe(citiesResult => {
        this.chartResultCities = citiesResult;

        this.chartResultCities.split = this.chartResultCities.title.split('?');

      });

      if (this.desmatInfo.year >= 2013) {
        this.http.get(citiesIllegal).subscribe(citiesIllegalResult => {
          this.chartResultCitiesIllegalAPP = citiesIllegalResult['resultAPP'];
          this.chartResultCitiesIllegalRL = citiesIllegalResult['resultRL'];

        });
      }
    }

    if (this.isFilteredByCity || this.isFilteredByState) {
      /* Atualiza indicadores de uso do Solo */

      this.http.get(urlUsoSolo).subscribe(usosoloResult => {

        this.chartUsoSolo = usosoloResult;

        for (let graphic of this.chartUsoSolo) {

          graphic.data = {
            labels: graphic.indicators.map(element => element.classe_lulc),
            datasets: [
              {
                data: graphic.indicators.map(element => element.desmat_area_classe_lulc),
                backgroundColor: graphic.indicators.map(element => element.color),
                hoverBackgroundColor: graphic.indicators.map(element => element.color)
              }
            ]
          };

          // graphic.options.height = "60vh";
          // graphic.options.responsive = true
          // graphic.options.maintainAspectRatio = false

          graphic.options.legend.onHover = function (event) {
            event.target.style.cursor = 'pointer';
            graphic.options.legend.labels.fontColor = '#0335fc';
          };

          graphic.options.legend.onLeave = function (event) {

            event.target.style.cursor = 'default';
            graphic.options.legend.labels.fontColor = '#fa1d00';
          };

          graphic.options.tooltips.callbacks = {
            title(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            },
            label(tooltipItem, data) {
              let percent = parseFloat(
                data['datasets'][0]['data'][tooltipItem['index']]
              ).toLocaleString('de-DE');
              return percent + ' km²';
            },
            // afterLabel: function (tooltipItem, data) {
            //   return "a calcular";
            // }
          };

        }

      }
      );
    }

  }

  onOpenLateralAccordionLULCTab(e) {

    if (((this.selectRegion.type == 'city') && (e.index == 1)) || ((this.selectRegion.type == 'state') && (e.index == 2))) {
      this.activeIndexLateralAccordion = true
      this.changeSelectedLulcChart({ index: 0 });
    }
    else {
      this.activeIndexLateralAccordion = false
    }

  }

  onCloseLateralAccordionLULCTab(e) {

    if (((this.selectRegion.type == 'city') && (e.index == 1)) || ((this.selectRegion.type == 'state') && (e.index == 2))) {
      let uso_terra = this.layersNames.find(element => element.id === "terraclass");
      uso_terra.visible = false;

      let agricultura = this.layersNames.find(element => element.id === "agricultura");
      agricultura.visible = false;

      this.changeVisibility(uso_terra, undefined)
      this.changeVisibility(agricultura, undefined)
    }
  }

  changeSelectedLulcChart(e) {

    let uso_terra = this.layersNames.find(element => element.id === "terraclass");
    let agricultura = this.layersNames.find(element => element.id === "agricultura");

    if (this.activeIndexLateralAccordion) {

      if (this.desmatInfo.year >= 2013) {
        if (e.index == 0) {
          uso_terra.selectedType = "uso_solo_terraclass_fip"
          uso_terra.visible = true;
          agricultura.visible = false;
        }
        else if (e.index == 1) {
          uso_terra.selectedType = "agricultura_agrosatelite_fip"
          uso_terra.visible = false
          agricultura.visible = true;
        }
      }
      else {
        uso_terra.selectedType = "uso_solo_probio_fip"
        uso_terra.visible = true;
        agricultura.visible = false;
      }

    }
    this.changeVisibility(uso_terra, undefined);
    this.changeVisibility(agricultura, undefined);



  }

  updateRegion(region) {
    let prodes = this.layersNames.find(element => element.id === 'desmatamento_prodes');

    if (region == this.defaultRegion) {
      this.valueRegion = '';
      this.currentData = '';
      this.desmatInfo = this.defaultPeriod

      prodes.selectedType = 'prodes_por_region_city_fip_img';

      let uso_terra = this.layersNames.find(element => element.id === "terraclass");
      uso_terra.visible = false;

      let agricultura = this.layersNames.find(element => element.id === "agricultura");
      agricultura.visible = false;


      this.changeVisibility(uso_terra, undefined)
      this.changeVisibility(agricultura, undefined)
      this.activeIndexLateralAccordion = false

    } else {
      prodes.selectedType = 'bi_ce_prodes_desmatamento_100_fip';
      this.infodataMunicipio = null;
    }

    this.changeVisibility(prodes, undefined);

    this.selectRegion = region;

    // this.matgroup.selectedIndex = 0

    this.isFilteredByCity = false;
    this.isFilteredByState = false;

    if (this.selectRegion.type == 'city') {
      this.msFilterRegion = ' cd_geocmu = \'' + this.selectRegion.cd_geocmu + '\'';
      this.isFilteredByCity = true;
      this.isFilteredByState = true;
      this.selectRegion.regionTypeBr = 'Município de ';
    } else if (this.selectRegion.type == 'state') {
      this.msFilterRegion = 'uf = \'' + this.selectRegion.value + '\'';
      this.isFilteredByState = true;
    } else { this.msFilterRegion = ""; }

    this.updateExtent();
    this.updateSourceAllLayer();

    let register_event = this.selectRegion.type + "_" + this.selectRegion.text

    this.googleAnalyticsService.eventEmitter("changeRegion", "Select-Region", register_event, 7);

  }

  private getResolutions(projection) {
    let projExtent = projection.getExtent();
    let startResolution = OlExtent.getWidth(projExtent) / 256;
    let resolutions = new Array(22);
    for (let i = 0, ii = resolutions.length; i < ii; ++i) {
      resolutions[i] = startResolution / Math.pow(2, i);
    }
    return resolutions;
  }

  openDialog(): void {
    //  @todo REMOVE
    window.document.body.style.cursor = 'auto';

    this.dataForDialog.language = this.language;
    this.dataForDialog.textosDaDialog = this.textOnDialog;

    let dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: window.innerWidth - 150 + 'px',
      height: window.innerHeight - 50 + 'px',
      data: this.dataForDialog,
    });
  }

  protected createMap() {
    this.createBaseLayers();
    this.createLayers();

    this.map = new OlMap({
      target: 'map',
      layers: this.layers,
      view: new OlView({
        center: OlProj.fromLonLat([-49, -13.5]),
        projection: this.projection,
        zoom: this.currentZoom,
        maxZoom: 18,
        minZoom: 2
      }),
      loadTilesWhileAnimating: true,
      loadTilesWhileInteracting: true,
      interactions: defaultInteractions({ altShiftDragRotate: false, pinchRotate: false })
    });

    let style = new Style({
      image: new Circle({
        radius: 7,
        fill: new Fill({ color: '#b8714e', width: 1 }),
        stroke: new Stroke({ color: '#7b2900', width: 2 })
      })
    });


    let prodes = this.layersNames.find(element => element.id === 'desmatamento_prodes');
    let deter = this.layersNames.find(element => element.id === 'desmatamento_deter');

    if (prodes.visible || deter.visible) {

      this.infoOverlay = new Overlay({
        element: document.getElementById('map-info'),
        offset: [15, 15],
        stopEvent: false
      });
      this.keyForPointer = this.map.on(
        'pointermove',
        this.callbackPointerMoveMap.bind(this)
      );

      this.keyForClick = this.map.on(
        'singleclick',
        this.callbackClickMap.bind(this)
      );

      this.map.addOverlay(this.infoOverlay);
    }
  }

  private callbackPointerMoveMap(evt) {

    let utfgridlayerVisible = this.utfgridlayer.getVisible();
    if (!utfgridlayerVisible || evt.dragging) {
      return;
    }

    let utfgridlayerVisibleDeter = this.utfgridlayerDeter.getVisible();
    if (!utfgridlayerVisibleDeter || evt.dragging) {
      return;
    }

    let utfgridlayerVisibleCampo = this.utfgridlayerCampo.getVisible();
    if (!utfgridlayerVisibleCampo || evt.dragging) {
      return;
    }

    let utfgridlayerVisibleMunicipio = this.utfgridlayerMunicipio.getVisible();
    if (!utfgridlayerVisibleMunicipio || evt.dragging) {
      return;
    }

    let utfgridlayerVisibleABC = this.utfgridlayerabc.getVisible();
    if (!utfgridlayerVisibleABC || evt.dragging) {
      return;
    }

    let prodes = this.layersNames.find(element => element.id === 'desmatamento_prodes');
    let deter = this.layersNames.find(element => element.id === "desmatamento_deter");



    if (prodes.visible || deter.visible) {

      let coordinate = this.map.getEventCoordinate(evt.originalEvent);
      let viewResolution = this.map.getView().getResolution();

      let isCampo = false;
      let isOficial = false;
      let isMunicipio = false;
      let isABC = false;
      let isOficialDeter = false


      if (prodes.selectedType == 'bi_ce_prodes_desmatamento_100_fip') {
        isOficial = true;
      }

      if (deter.selectedType === 'bi_ce_deter_desmatamento_100_fip') {
        isOficialDeter = true;
      }

      if ((prodes.selectedType == 'bi_ce_prodes_desmatamento_pontos_campo_fip') ||
        (deter.selectedType == 'bi_ce_deter_desmatamento_pontos_campo_fip')) {
        isCampo = true;
      }

      if ((prodes.selectedType == 'prodes_por_region_city_fip_img') || (prodes.selectedType == 'prodes_por_region_state_fip_img')) {
        isMunicipio = true;
      }

      if (prodes.selectedType == 'bi_ce_prodes_desmatamento_abc_fip') {
        isABC = true;
      }

      if (isMunicipio) {
        if (this.utfgridmunicipio) {
          this.utfgridmunicipio.forDataAtCoordinateAndResolution(coordinate, viewResolution, function (data) {
            if (data) {

              if (prodes.visible && ((prodes.selectedType == 'prodes_por_region_city_fip_img') || (prodes.selectedType == 'prodes_por_region_state_fip_img'))) {
                // console.log(this.infodataMunicipio)
                window.document.body.style.cursor = 'pointer';
                this.infodataMunicipio = data;
                this.infodataMunicipio.region_display = this.infodataMunicipio.region_display.toUpperCase();

                this.infodataMunicipio.area_app_show = this.infodataMunicipio.area_app == '' ? this.minireportText.undisclosed_message : ('' + (Math.round(this.infodataMunicipio.area_app * 100) / 100) + ' km²').replace('.', ',');
                this.infodataMunicipio.area_rl_show = this.infodataMunicipio.area_rl == '' ? this.minireportText.undisclosed_message : ('' + (Math.round(this.infodataMunicipio.area_rl * 100) / 100) + ' km²').replace('.', ',');
              } else {
                this.infodataMunicipio = null;
              }

              this.infoOverlay.setPosition(data ? coordinate : undefined);

            } else {
              window.document.body.style.cursor = 'auto';
              this.infodataMunicipio = null;
            }

          }.bind(this)
          );
        }
      }

      if (isOficialDeter) {

        if (deter.selectedType === 'bi_ce_deter_desmatamento_100_fip') {
          if (this.utfgridsourceDeter) {
            this.utfgridsourceDeter.forDataAtCoordinateAndResolution(coordinate, viewResolution, function (data) {
              if (data) {
                data.origin_table = data.origin_table.toUpperCase();

                if (deter.visible && (deter.selectedType == 'bi_ce_deter_desmatamento_100_fip')) {
                  if (data.origin_table == 'DETER') {
                    window.document.body.style.cursor = 'pointer';
                    this.infodataDeter = data;
                    this.infodataDeter.dataFormatada = this.infodataDeter.data_detec == '' ? this.minireportText.undisclosed_message : this.datePipe.transform(new Date(this.infodataDeter.data_detec), 'dd/MM/yyyy');
                    this.infodataDeter.sucept_desmatFormatada = this.infodataDeter.sucept_desmat == '' ? this.minireportText.not_computed_message : ('' + (this.infodataDeter.sucept_desmat * 100).toFixed(2) + '%').replace('.', ',');
                    this.infodataDeter.municipio = this.infodataDeter.municipio.toUpperCase();

                    this.infoOverlay.setPosition(this.infodataDeter ? coordinate : undefined);
                  }
                }

              } else {
                window.document.body.style.cursor = 'auto';
                this.infodataDeter = null;
              }

            }.bind(this)
            );

          }
        }
      }

      if (isOficial) {

        let openOficial = false;

        if ((prodes.selectedType == 'bi_ce_prodes_desmatamento_100_fip')) {

          if (this.utfgridsource) {
            this.utfgridsource.forDataAtCoordinateAndResolution(coordinate, viewResolution, function (data) {
              if (data) {
                isCampo = false;
                data.origin_table = data.origin_table.toUpperCase();
                if (prodes.visible && (prodes.selectedType == 'bi_ce_prodes_desmatamento_100_fip')) {
                  if (data.origin_table == 'PRODES') {
                    window.document.body.style.cursor = 'pointer';
                    this.infodata = data;
                    this.infodata.dataFormatada = this.infodata.data_detec == '' ? this.minireportText.undisclosed_message : this.datePipe.transform(new Date(this.infodata.data_detec), 'dd/MM/yyyy');
                    this.infodata.sucept_desmatFormatada = this.infodata.sucept_desmat == null ? this.minireportText.not_computed_message : ('' + (this.infodata.sucept_desmat * 100).toFixed(2) + '%').replace('.', ',');
                    this.infodata.municipio = this.infodata.municipio.toUpperCase();
                    openOficial = true;
                    this.infoOverlay.setPosition(this.infodata ? coordinate : undefined);
                  }
                }
              } else {
                window.document.body.style.cursor = 'auto';
                this.infodata = null;
              }

            }.bind(this)
            );
          }
        }
      }

      if (isCampo) {
        let openCampo = false;
        if ((prodes.selectedType == 'bi_ce_prodes_desmatamento_pontos_campo_fip') ||
          (deter.selectedType == 'bi_ce_deter_desmatamento_pontos_campo_fip')) {

          if (this.utfgridCampo) {
            this.utfgridCampo.forDataAtCoordinateAndResolution(coordinate, viewResolution, function (data) {
              if (data) {

                data.origin_table = data.origin_table.toUpperCase();

                if (prodes.visible && (prodes.selectedType == 'bi_ce_prodes_desmatamento_pontos_campo_fip')) {
                  if (data.origin_table == 'PRODES') {
                    window.document.body.style.cursor = 'pointer';

                    this.infodataCampo = data;
                    this.infodataCampo.dataFormatada = this.infodataCampo.data_detec == '' ? this.minireportText.undisclosed_message : this.datePipe.transform(new Date(this.infodataCampo.data_detec), 'dd/MM/yyyy');
                    this.infodataCampo.sucept_desmatFormatada = this.infodataCampo.sucept_desmat == '' ? this.minireportText.not_computed_message : ('' + (this.infodataCampo.sucept_desmat * 100).toFixed(2) + '%').replace('.', ',');
                    this.infodataCampo.origin_table = this.infodataCampo.origin_table.toUpperCase();
                    openCampo = true;
                    this.infoOverlay.setPosition(this.infodataCampo ? coordinate : undefined);
                  }
                }
                if (!openCampo && deter.visible && (deter.selectedType == 'bi_ce_deter_desmatamento_pontos_campo_fip')) {
                  if (data.origin_table == 'DETER') {
                    window.document.body.style.cursor = 'pointer';
                    this.infodataCampo = data;
                    this.infodataCampo.dataFormatada = this.infodataCampo.data_detec == '' ? this.minireportText.undisclosed_message : this.datePipe.transform(new Date(this.infodataCampo.data_detec), 'dd/MM/yyyy');
                    this.infodataCampo.sucept_desmatFormatada = this.infodataCampo.sucept_desmat == '' ? this.minireportText.not_computed_message : ('' + (this.infodataCampo.sucept_desmat * 100).toFixed(2) + '%').replace('.', ',');
                    this.infodataCampo.origin_table = this.infodataCampo.origin_table.toUpperCase();
                    this.infodataCampo.municipio = this.infodataCampo.municipio.toUpperCase();
                    this.infoOverlay.setPosition(this.infodataCampo ? coordinate : undefined);
                  }
                }

                // this.infoOverlay.setPosition(data ? coordinate : undefined);
              } else {
                this.infodataCampo = null;
                window.document.body.style.cursor = 'auto';
              }
            }.bind(this)
            );
          }
        }

      }

      if (isABC) {
        if (prodes.visible && (prodes.selectedType == 'bi_ce_prodes_desmatamento_abc_fip')) {
          if (this.utfgridabc) {
            this.utfgridabc.forDataAtCoordinateAndResolution(coordinate, viewResolution, function (data) {
              if (data) {
                // console.log(OlProj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'))

                window.document.body.style.cursor = 'pointer';
                this.infodataABC = data;
                this.infodataABC.origin_table = 'PRODES';
                this.infodataABC.dataFormatada = this.infodataABC.data_detec == '' ? this.minireportText.undisclosed_message : this.datePipe.transform(new Date(this.infodataABC.data_detec), 'dd/MM/yyyy');
                this.infodataABC.year = new Date(this.infodataABC.data_detec).getFullYear();

                if (this.infodataABC.tec_impl != '') {

                  for (const m of this.mapForABC) {
                    if (m[0] === this.infodataABC.tec_impl) {
                      if (this.language === 'pt-br') {
                        this.infodataABC.tec_impl = m[1]['pt-br'];
                      }
                      else {
                        this.infodataABC.tec_impl = m[1]['en-us'];
                      }
                    }
                  }
                }

                if (this.infodataABC.producao != '') {
                  for (const m of this.mapForProducao) {
                    if (m[0] === this.infodataABC.producao) {
                      if (this.language === 'pt-br') {
                        this.infodataABC.producao = m[1]['pt-br'];
                      }
                      else {
                        this.infodataABC.producao = m[1]['en-us'];
                      }
                    }
                  }
                }

                this.infoOverlay.setPosition(data ? coordinate : undefined);
              }
              else {
                this.infodataABC = null;
                window.document.body.style.cursor = 'auto';
              }
            }.bind(this)
            );
          }
        }
      }

      if (this.infodataABC || this.infodataCampo || this.infodata || this.infodataDeter || this.infodataMunicipio) {
        window.document.body.style.cursor = 'pointer';
      }
      else {
        window.document.body.style.cursor = 'auto';
      }

    }
  }

  callbackClickMap(evt) {

    let zoom = this.map.getView().getZoom();
    let viewResolution = this.map.getView().getResolution();
    let coordinate = null;

    coordinate = this.map.getEventCoordinate(evt.originalEvent);

    let prodes = this.layersNames.find(element => element.id === 'desmatamento_prodes');
    let deter = this.layersNames.find(element => element.id === 'desmatamento_deter');

    let layers = this.layersNames;

    if (prodes.visible || deter.visible) {

      let isCampo = false;
      let isOficial = false;
      let isMunicipio = false;
      let isABC = false;
      let isOficialDeter = false

      if (prodes.selectedType == 'bi_ce_prodes_desmatamento_100_fip') {
        isOficial = true;
      }

      if (deter.selectedType == 'bi_ce_deter_desmatamento_100_fip') {
        isOficialDeter = true;
      }

      if ((prodes.selectedType == 'bi_ce_prodes_desmatamento_pontos_campo_fip') ||
        (deter.selectedType == 'bi_ce_deter_desmatamento_pontos_campo_fip')) {
        isCampo = true;
      }

      if ((prodes.selectedType == 'prodes_por_region_city_fip_img') || (prodes.selectedType == 'prodes_por_region_state_fip_img')) {
        isMunicipio = true;
      }

      if (prodes.selectedType == 'bi_ce_prodes_desmatamento_abc_fip') {
        isABC = true;
      }

      if (isMunicipio) {
        if (this.utfgridmunicipio) {
          this.utfgridmunicipio.forDataAtCoordinateAndResolution(coordinate, viewResolution, function (data) {

            if (data) {
              // console.log(OlProj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'))

              if (prodes.visible && ((prodes.selectedType == 'prodes_por_region_city_fip_img') || (prodes.selectedType == 'prodes_por_region_state_fip_img'))) {

                this.http.get(SEARCH_REGION, { params: PARAMS.set('key', data.region_name).set('type', data.region_type) }).subscribe(result => {
                  let ob = { text: '' };

                  for (let item of result) {
                    if (item.type === data.region_type && data.region_name.toUpperCase() === item.value.toUpperCase()) {
                      ob = item;
                    }
                  }

                  this.currentData = ob.text;
                  this.updateRegion(ob);

                  let prodes = this.layersNames.find(element => element.id === 'desmatamento_prodes');
                  prodes.selectedType = 'bi_ce_prodes_desmatamento_100_fip';
                  this.changeVisibility(prodes, undefined);
                  this.infodataMunicipio = null;

                });
              }
            }
          }.bind(this)
          );
        }
      }

      if (isABC) {
        if (this.utfgridabc) {
          this.utfgridabc.forDataAtCoordinateAndResolution(coordinate, viewResolution, function (data) {

            if (data) {
              // console.log(OlProj.transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'))
              if (prodes.visible && (prodes.selectedType == 'bi_ce_prodes_desmatamento_abc_fip')) {
                this.dataForDialog = data;
                this.dataForDialog.origin_table = 'PRODES';
                this.dataForDialog.dataFormatada = this.dataForDialog.data_detec == '' ? this.minireportText.undisclosed_message : this.datePipe.transform(new Date(this.dataForDialog.data_detec), 'dd/MM/yyyy');
                this.dataForDialog.coordinate = coordinate;
                this.dataForDialog.datePipe = this.datePipe;
                this.dataForDialog.layers = layers;
                this.dataForDialog.year = new Date(this.dataForDialog.data_detec).getFullYear();
                this.dataForDialog.mapForABC = this.mapForABC;
                this.dataForDialog.mapForProducao = this.mapForProducao;

                this.openDialog();

              }
            }
          }.bind(this)
          );
        }
      }

      if (isCampo) {

        let open = false;
        if (this.utfgridCampo) {
          this.utfgridCampo.forDataAtCoordinateAndResolution(coordinate, viewResolution, function (data) {

            if (data) {
              data.origin_table = data.origin_table.toUpperCase();
              if (prodes.visible && (prodes.selectedType == 'bi_ce_prodes_desmatamento_pontos_campo_fip')) {

                isOficial = false;
                this.dataForDialog = data;
                this.dataForDialog.coordinate = coordinate;
                this.dataForDialog.year = new Date(this.dataForDialog.data_detec).getFullYear();
                this.dataForDialog.layers = layers;
                this.dataForDialog.datePipe = this.datePipe;
                open = true;
                this.openDialog();
              }

              if (!open && deter.visible && (deter.selectedType == 'bi_ce_deter_desmatamento_pontos_campo_fip')) {
                isOficial = false;
                this.dataForDialog = data;
                this.dataForDialog.coordinate = coordinate;
                this.dataForDialog.year = new Date(this.dataForDialog.data_detec).getFullYear();
                this.dataForDialog.layers = layers;
                this.dataForDialog.datePipe = this.datePipe;
                this.openDialog();
              }

            }
          }.bind(this)
          );
        }
      }

      let alreadyOpen = false;
      if (isOficial) {

        alreadyOpen = false;
        if (this.utfgridsource) {
          this.utfgridsource.forDataAtCoordinateAndResolution(coordinate, viewResolution, function (data) {
            if (data) {
              data.origin_table = data.origin_table.toUpperCase();
              if (prodes.visible && (prodes.selectedType == 'bi_ce_prodes_desmatamento_100_fip')) {
                this.dataForDialog = data;
                this.dataForDialog.coordinate = coordinate;
                this.dataForDialog.datePipe = this.datePipe;
                this.dataForDialog.layers = layers;
                this.dataForDialog.year = this.selectedTimeFromLayerType('bi_ce_prodes_desmatamento_100_fip').year;
                alreadyOpen = true;
                this.openDialog();
              }

            }
          }.bind(this)
          );
        }
      }

      if (isOficialDeter && !alreadyOpen) {

        if (deter.selectedType === 'bi_ce_deter_desmatamento_100_fip') {
          if (this.utfgridsourceDeter) {
            this.utfgridsourceDeter.forDataAtCoordinateAndResolution(coordinate, viewResolution, function (data) {
              if (data) {
                data.origin_table = data.origin_table.toUpperCase();
                if (deter.visible && (deter.selectedType == 'bi_ce_deter_desmatamento_100_fip')) {
                  this.dataForDialog = data;
                  this.dataForDialog.coordinate = coordinate;
                  this.dataForDialog.datePipe = this.datePipe;
                  this.dataForDialog.layers = layers;
                  this.dataForDialog.year = new Date(this.dataForDialog.data_detec).getFullYear();
                  this.openDialog();
                }
              }
            }.bind(this)
            );
          }
        }
      }

    }
  }

  private createBaseLayers() {
    this.mapbox = {
      visible: true,
      layer: new OlTileLayer({
        source: new OlXYZ({
          wrapX: false,
          url:
            'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
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
            'VmCqTus7G3OxlDECYJ7O~G3Wj1uu3KG6y-zycuPHKrg~AhbMxjZ7yyYZ78AjwOVIV-5dcP5ou20yZSEVeXxqR2fTED91m_g4zpCobegW4NPY',
          imagerySet: 'Aerial'
        }),
        visible: false
      })
    };

    this.googlemaps = {
      visible: false,
      layer: new OlTileLayer({
        source: new OlXYZ({
          url:
            'https://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
          attributions: [
            new Attribution({ html: '© Google' }),
            new Attribution({ html: '<a href="https://developers.google.com/maps/terms">Terms of Use.</a>' })
          ]

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
            'VmCqTus7G3OxlDECYJ7O~G3Wj1uu3KG6y-zycuPHKrg~AhbMxjZ7yyYZ78AjwOVIV-5dcP5ou20yZSEVeXxqR2fTED91m_g4zpCobegW4NPY',
          imagerySet: 'Road'
        }),
        visible: false
      })
    };

    this.relevo = {
      visible: false,
      layer: new OlTileLayer({
        source: new OlXYZ({
          url:
            'https://server.arcgisonline.com/ArcGIS/rest/services/' +
            'World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
        }),
        visible: false
      })
    };

    this.landsat = {
      visible: false,
      layer: new OlTileLayer({
        source: new TileWMS({
          url: 'http://mapbiomas-staging.terras.agr.br/wms',
          projection: 'EPSG:3857',
          params: {
            LAYERS: 'rgb',
            SERVICE: 'WMS',
            TILED: true,
            VERSION: '1.1.1',
            TRANSPARENT: 'true',
            MAP: 'wms/v/staging/classification/rgb.map',
            YEAR: 2017
          },
          serverType: 'mapserver',
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
    let olLayers: OlTileLayer[] = new Array();

    // layers
    for (let layer of this.layersTypes) {
      this.LayersTMS[layer.value] = this.createTMSLayer(layer);
      this.layers.push(this.LayersTMS[layer.value]);
    }

    // limits
    for (let limits of this.limitsNames) {
      this.limitsTMS[limits.value] = this.createTMSLayer(limits);
      this.layers.push(this.limitsTMS[limits.value]);
    }

    this.regionsLimits = this.createVectorLayer('regions', '#666633', 3);
    this.layers.push(this.regionsLimits);

    this.utfgridsource = new UTFGrid({
      tileJSON: this.getTileJSON()
    });

    this.utfgridlayer = new OlTileLayer({
      source: this.utfgridsource
    });

    this.utfgridsourceDeter = new UTFGrid({
      tileJSON: this.getTileJSONDeter()
    });

    this.utfgridlayerDeter = new OlTileLayer({
      source: this.utfgridsourceDeter
    });

    this.utfgridCampo = new UTFGrid({
      tileJSON: this.getTileJSONCampo()
    });

    this.utfgridlayerCampo = new OlTileLayer({
      source: this.utfgridCampo
    });

    this.utfgridmunicipio = new UTFGrid({
      tileJSON: this.getTileJSONMunicipio()
    });

    this.utfgridlayerMunicipio = new OlTileLayer({
      source: this.utfgridmunicipio
    });

    this.utfgridabc = new UTFGrid({
      tileJSON: this.getTileJSONABC()
    });

    this.utfgridlayerabc = new OlTileLayer({
      source: this.utfgridabc
    });

    this.layers.push(this.utfgridlayer);
    this.layers.push(this.utfgridlayerDeter);
    this.layers.push(this.utfgridlayerCampo);
    this.layers.push(this.utfgridlayerMunicipio);
    this.layers.push(this.utfgridlayerabc);

    this.layers = this.layers.concat(olLayers.reverse());
  }

  private getTileJSON() {

    let text = '';

    text = this.selectedTimeFromLayerType('bi_ce_prodes_desmatamento_100_fip').value;

    if (this.selectRegion.type === 'city') {
      text += ' AND cd_geocmu = \'' + this.selectRegion.cd_geocmu + '\'';
    } else if (this.selectRegion.type === 'state') {
      text += ' AND uf = \'' + this.selectRegion.value + '\'';
    }

    return {
      version: '2.2.0',
      grids: [
        this.returnUTFGRID('bi_ce_prodes_desmatamento_100_fip_utfgrid', text, '{x}+{y}+{z}')
      ]
    };

  }

  private getTileJSONDeter() {

    let text = '';

    text = this.selectedTimeFromLayerType('bi_ce_deter_desmatamento_100_fip').value;

    if (this.selectRegion.type === 'city') {
      text += ' AND cd_geocmu = \'' + this.selectRegion.cd_geocmu + '\'';
    } else if (this.selectRegion.type === 'state') {
      text += ' AND uf = \'' + this.selectRegion.value + '\'';
    }


    // console.log(this.selectRegion, text)

    return {
      version: '2.2.0',
      grids: [
        this.returnUTFGRID('bi_ce_deter_desmatamento_100_fip_utfgrid', text, '{x}+{y}+{z}')
      ]
    };

  }

  private getTileJSONCampo() {

    let text = '1=1';


    if (this.selectRegion.type === 'city') {
      text += ' AND p.cd_geocmu = \'' + this.selectRegion.cd_geocmu + '\'';
    } else if (this.selectRegion.type === 'state') {
      text += ' AND p.uf = \'' + this.selectRegion.value + '\'';
    }

    return {
      version: '2.2.0',
      grids: [
        this.returnUTFGRID('bi_ce_info_utfgrid_pontos_campo_fip', text, '{x}+{y}+{z}')
      ]
    };

  }

  private getTileJSONMunicipio() {

    let text = '1=1';
    let prodes = this.layersNames.find(element => element.id === 'desmatamento_prodes');
    let time = { value: '' }
    let layerutf = ''

    if (prodes.selectedType == 'prodes_por_region_city_fip_img') {
      time = this.selectedTimeFromLayerType('prodes_por_region_city_fip_img');
      layerutf = 'prodes_por_region_city_fip_utfgrid'
    }
    else if (prodes.selectedType == 'prodes_por_region_state_fip_img') {
      time = this.selectedTimeFromLayerType('prodes_por_region_state_fip_img');
      layerutf = 'prodes_por_region_state_fip_utfgrid'
    }


    if (this.selectRegion.type === 'city') {
      time = this.selectedTimeFromLayerType('prodes_por_region_city_fip_img');
      text += ' AND region_type = \'' + this.selectRegion.type + '\'';
      layerutf = 'prodes_por_region_city_fip_utfgrid'
    }
    else if (this.selectRegion.type === 'state') {
      time = this.selectedTimeFromLayerType('prodes_por_region_state_fip_img');
      layerutf = 'prodes_por_region_state_fip_utfgrid'
      text += ' AND region_type = \'' + this.selectRegion.type + '\'';
    }

    text += ' AND ' + time.value;

    return {
      version: '2.2.0',
      grids: [
        this.returnUTFGRID(layerutf, text, '{x}+{y}+{z}')
      ]
    };

  }

  private getTileJSONABC() {

    let text = '1=1';

    if (this.selectRegion.type === 'city') {
      text += ' AND cd_geocmu = \'' + this.selectRegion.cd_geocmu + '\'';
    } else if (this.selectRegion.type === 'state') {
      text += ' AND uf = \'' + this.selectRegion.value + '\'';
    }

    return {
      version: '2.2.0',
      grids: [
        this.returnUTFGRID('bi_ce_prodes_desmatamento_abc_fip_utfgrid', text, '{x}+{y}+{z}')
      ]
    };

  }

  private returnUTFGRID(layername, filter, tile) {
    return '/ows?layers=' + layername + '&MSFILTER=' + filter + '&mode=tile&tile=' + tile + '&tilemode=gmap&map.imagetype=utfgrid'
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
            color: '#dedede',
            width: width + 1
          })
        }),
        new Style({
          stroke: new Stroke({
            color: strokeColor,
            width
          })
        })
      ]
    });
  }

  private parseUrls(layer) {
    let result = [];

    let filters = [];

    if (layer.timeHandler == 'msfilter' && layer.times) {
      filters.push(layer.timeSelected);
    }
    if (layer.layerfilter) { filters.push(layer.layerfilter); }
    if (this.regionFilterDefault) { filters.push(this.regionFilterDefault); }
    if (layer.regionFilter && this.msFilterRegion) {
      filters.push(this.msFilterRegion);
    }

    let msfilter = '';
    if (filters.length > 0) { msfilter += '&MSFILTER=' + filters.join(' AND '); }

    let layername = layer.value;
    if (layer.timeHandler == 'layername') { layername = layer.timeSelected; }

    for (let url of this.urls) {
      result.push(url + '?layers=' + layername + msfilter + '&mode=tile&tile={x}+{y}+{z}' + '&tilemode=gmap' + '&map.imagetype=png');
    }
    return result;
  }

  private updateSourceAllLayer() {
    for (let layer of this.layersTypes) {
      this.updateSourceLayer(layer, false);
    }
  }

  private updateSourceLayer(layer, fromUser) {
    if (layer['times']) {
      this.periodSelected = layer['times'].find(
        element => element.value === layer.timeSelected
      );
    }

    if (layer['value'] === 'bi_ce_prodes_desmatamento_100_fip' || layer['value'] === 'prodes_por_region_city_fip_img' || layer['value'] === 'prodes_por_region_state_fip_img') {
      this.desmatInfo = this.periodSelected;
      this.handleInteraction()
      this.updateCharts();
    }

    this.handleInteraction();

    if (this.selectRegion.type == 'city' || this.selectRegion.type == 'state') {
      this.changeSelectedLulcChart({ index: 0 });
    }

    let source_layers = this.LayersTMS[layer.value].getSource();
    source_layers.setUrls(this.parseUrls(layer));
    source_layers.refresh();

    // console.log(layer)

    if (layer.visible) {
      let layerTested = layer.value;
      let time_selected = layer.timeSelected

      let register_event = layerTested
      if (time_selected != undefined) {
        register_event += "_" + time_selected
      }

      this.googleAnalyticsService.eventEmitter("changeSourceLayer", "UpdateSourceLayer", register_event, 2);
    }

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
    // limits
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

  private handleInteraction() {

    let prodes = this.layersNames.find(element => element.id === 'desmatamento_prodes');
    let deter = this.layersNames.find(element => element.id === 'desmatamento_deter');

    if (prodes.visible || deter.visible) {
      if (prodes.visible) {
        if ((prodes.selectedType == 'bi_ce_prodes_desmatamento_100_fip')) {
          if (this.utfgridsource) {
            let tileJSON = this.getTileJSON();

            this.utfgridsource.tileUrlFunction_ = _ol_TileUrlFunction_.createFromTemplates(tileJSON.grids, this.utfgridsource.tileGrid);
            this.utfgridsource.tileJSON = tileJSON;
            this.utfgridsource.refresh();

            this.utfgridlayer.setVisible(true);
          }
        }
        else {
          this.infodata = null;
          window.document.body.style.cursor = 'auto';
        }
        if ((prodes.selectedType == 'bi_ce_prodes_desmatamento_pontos_campo_fip')) {
          if (this.utfgridCampo) {
            let tileJSONCampo = this.getTileJSONCampo();

            this.utfgridCampo.tileUrlFunction_ = _ol_TileUrlFunction_.createFromTemplates(tileJSONCampo.grids, this.utfgridCampo.tileGrid);
            this.utfgridCampo.tileJSON = tileJSONCampo;
            this.utfgridCampo.refresh();

            this.utfgridlayerCampo.setVisible(true);
          }
        }
        else {
          this.infodataCampo = null;
          window.document.body.style.cursor = 'auto';
        }

        if ((prodes.selectedType == 'prodes_por_region_city_fip_img') || (prodes.selectedType == 'prodes_por_region_state_fip_img')) {
          if (this.utfgridmunicipio) {
            let tileJSONMunicipio = this.getTileJSONMunicipio();

            this.utfgridmunicipio.tileUrlFunction_ = _ol_TileUrlFunction_.createFromTemplates(tileJSONMunicipio.grids, this.utfgridmunicipio.tileGrid);
            this.utfgridmunicipio.tileJSON = tileJSONMunicipio;
            this.utfgridmunicipio.refresh();

            this.utfgridlayerMunicipio.setVisible(true);
          }
        }
        else {
          this.infodataMunicipio = null;
          window.document.body.style.cursor = 'auto';
        }

        if ((prodes.selectedType == 'bi_ce_prodes_desmatamento_abc_fip')) {
          if (this.utfgridabc) {
            let tileJSONabc = this.getTileJSONABC();

            this.utfgridabc.tileUrlFunction_ = _ol_TileUrlFunction_.createFromTemplates(tileJSONabc.grids, this.utfgridabc.tileGrid);
            this.utfgridabc.tileJSON = tileJSONabc;
            this.utfgridabc.refresh();

            this.utfgridlayerabc.setVisible(true);
          }
        }
        else {
          this.infodataABC = null;
          window.document.body.style.cursor = 'auto';
        }

      }

      if (deter.visible) {

        if ((deter.selectedType == 'bi_ce_deter_desmatamento_100_fip')) {
          if (this.utfgridsourceDeter) {
            let tileJSON = this.getTileJSONDeter();

            this.utfgridsourceDeter.tileUrlFunction_ = _ol_TileUrlFunction_.createFromTemplates(tileJSON.grids, this.utfgridsourceDeter.tileGrid);
            this.utfgridsourceDeter.tileJSON = tileJSON;
            this.utfgridsourceDeter.refresh();

            this.utfgridlayerDeter.setVisible(true);
          }
        }
        else {
          this.infodataDeter = null;
          window.document.body.style.cursor = 'auto';
        }
        if ((deter.selectedType == 'bi_ce_deter_desmatamento_pontos_campo_fip')) {
          if (this.utfgridCampo) {
            let tileJSONCampo = this.getTileJSONCampo();

            this.utfgridCampo.tileUrlFunction_ = _ol_TileUrlFunction_.createFromTemplates(tileJSONCampo.grids, this.utfgridCampo.tileGrid);
            this.utfgridCampo.tileJSON = tileJSONCampo;
            this.utfgridCampo.refresh();

            this.utfgridlayerCampo.setVisible(true);
          }
        }

      }
    }
    // else if (this.utfgridsource && this.utfgridCampo && this.utfgridmunicipio && this.utfgridabc && this.utfgridsourceDeter) {
    //   this.utfgridlayer.setVisible(false);
    //   this.utfgridlayerCampo.setVisible(false);
    //   this.utfgridlayerMunicipio.setVisible(false);
    //   this.utfgridlayerabc.setVisible(false);
    //   this.utfgridlayerDeter.setVisible(false);
    // }
  }

  showDialogUTFGrid() {
    let dialog = { visibility: 'hidden' };

    if (this.infodata) {
      dialog.visibility = 'visible'
    }

    if (this.infodataCampo) {
      dialog.visibility = 'visible'
    }
    if (this.infodataMunicipio) {
      dialog.visibility = 'visible'
    }

    if (this.infodataABC) {
      dialog.visibility = 'visible'
    }

    if (this.infodataDeter) {
      dialog.visibility = 'visible'
    }

    return dialog;
  }

  disableUTFGrid() {
    this.infodataMunicipio = null
    this.infodata = null
    this.infodataABC = null
    this.infodataCampo = null
    this.infodataDeter = null
    window.document.body.style.cursor = 'auto';
  }

  changeVisibility(layer, e) {
    for (let layerType of layer.types) {
      this.LayersTMS[layerType.value].setVisible(false);
    }

    if (e != undefined) {
      layer.visible = e.checked;
    }

    if (layer.id == "desmatamento_prodes" || layer.id == "desmatamento_deter") {
      if (layer.visible) {
        this.handleInteraction();
      }
      else {
        this.disableUTFGrid();
      }
    }
    this.LayersTMS[layer.selectedType].setVisible(layer.visible);

    if (layer.visible) {
      let register_event = ''

      if (layer.id != 'satelite') {
        let layerTested = this.layersNames.find(element => element.id === layer.id);
        let time_selected = this.selectedTimeFromLayerType(layerTested.selectedType)
        register_event = layerTested.selectedType
        if (time_selected != undefined) {
          register_event += "_" + time_selected.value
        }
      }
      else {
        register_event = layer.selectedType + "_" + (layer.selectedType === 'landsat' ? layer.types[0].timeSelected : layer.types[1].timeSelected)
      }

      // console.log(layerTested.selectedType, time_selected, register_event)
      this.googleAnalyticsService.eventEmitter("changeLayer", "VisibilityLayer", register_event, 1);

    }

  }

  private updateDescriptor() {

    this.descriptor.type = this.descriptorText.type_of_information_label[this.language];

    for (let group of this.descriptor.groups) {
      group.label = this.descriptorText[group.id].label[this.language];

      for (let layer of group.layers) {
        layer.label = this.descriptorText[group.id].layers[layer.id].label[this.language];

        for (let layerType of layer.types) {

          if (this.descriptorText[group.id].layers[layer.id].hasOwnProperty('types')) {

            if (this.descriptorText[group.id].layers[layer.id].types[layerType.value].hasOwnProperty('view_value')) {

              layerType.Viewvalue = this.descriptorText[group.id].layers[layer.id].types[layerType.value].view_value[this.language];
            }
            if (this.descriptorText[group.id].layers[layer.id].types[layerType.value].hasOwnProperty('timelabel')) {
              layerType.timeLabel = this.descriptorText[group.id].layers[layer.id].types[layerType.value].timelabel[this.language];
            }

            if (layerType.times && this.descriptorText[group.id].layers[layer.id].types[layerType.value].times) {
              for (let time of layerType.times) {
                time.Viewvalue = this.descriptorText[group.id].layers[layer.id].types[layerType.value].times[time.value][this.language]
              }
            }
          }
        }
      }
    }

    for (let basemap of this.descriptor.basemaps) {
      for (let types of basemap.types) {
        types.viewValue = this.descriptorText.basemaps.types[types.value][this.language];
      }
    }

    for (let limits of this.descriptor.limits) {
      for (let types of limits.types) {

        types.Viewvalue = this.descriptorText.limits.types[types.value][this.language];
      }
    }


  }

  public onFileComplete(data: any) {

    let map = this.map;

    this.layerFromUpload.checked = false;
    this.layerFromUpload.error = false;

    if (this.layerFromUpload.layer != null) {
      map.removeLayer(this.layerFromUpload.layer);
    }
    if (!data.hasOwnProperty('features')) {
      return;
    }

    if (data.features.length > 1) {
      this.layerFromUpload.loading = false;

      this.layerFromUpload.visible = false;
      this.layerFromUpload.label = data.name;
      this.layerFromUpload.layer = data;
      this.layerFromUpload.token = data.token;

    } else {
      this.layerFromUpload.loading = false;

      if (data.features[0].hasOwnProperty('properties')) {

        let auxlabel = Object.keys(data.features[0].properties)[0];
        this.layerFromUpload.visible = false;
        this.layerFromUpload.label = data.features[0].properties[auxlabel];
        this.layerFromUpload.layer = data;
        this.layerFromUpload.token = data.token;

      } else {
        this.layerFromUpload.visible = false;
        this.layerFromUpload.label = data.name;
        this.layerFromUpload.layer = data;
        this.layerFromUpload.token = data.token;
      }
    }

    this.layerFromUpload.visible = true;
    let vectorSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(data, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })
    });

    this.layerFromUpload.layer = new VectorLayer({
      source: vectorSource,
      style: [
        new Style({
          stroke: new Stroke({
            color: this.layerFromUpload.strokeColor,
            width: 4
          })
        }),
        new Style({
          stroke: new Stroke({
            color: this.layerFromUpload.strokeColor,
            width: 4,
            lineCap: 'round',
            zIndex: 1
          })
        })
      ]
    });


    this.googleAnalyticsService.eventEmitter("uploadLayer", "Upload", "uploadLayer", 4);

  }

  onChangeCheckUpload(event) {
    let map = this.map;
    this.layerFromUpload.checked = !this.layerFromUpload.checked;

    if (this.layerFromUpload.checked) {

      map.addLayer(this.layerFromUpload.layer);
      let extent = this.layerFromUpload.layer.getSource().getExtent();
      map.getView().fit(extent, { duration: 1800 });

      let prodes = this.layersNames.find(element => element.id === 'desmatamento_prodes');
      prodes.selectedType = 'bi_ce_prodes_desmatamento_100_fip';
      this.changeVisibility(prodes, undefined);
      this.infodataMunicipio = null;

    } else {
      map.removeLayer(this.layerFromUpload.layer);
    }

  }

  loadLayerFromConsultaToMap() {
    const currentMap = this.map;
    const vectorSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(this.layerFromConsulta.analyzedArea.geojson, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })
    });
    this.layerFromConsulta.layer = new VectorLayer({
      source: vectorSource,
      style: [
        new Style({
          stroke: new Stroke({
            color: this.layerFromConsulta.strokeColor,
            width: 4
          })
        }),
        new Style({
          stroke: new Stroke({
            color: this.layerFromConsulta.strokeColor,
            width: 4,
            lineCap: 'round',
            zIndex: 1
          })
        })
      ]
    });
    currentMap.addLayer(this.layerFromConsulta.layer);
    const extent = this.layerFromConsulta.layer.getSource().getExtent();
    currentMap.getView().fit(extent, { duration: 1800 });

    const prodes = this.layersNames.find(element => element.id === 'desmatamento_prodes');
    prodes.selectedType = 'bi_ce_prodes_desmatamento_100_fip';
    this.changeVisibility(prodes, undefined);
    this.infodataMunicipio = null;
  }

  async searchUploadShape() {
    let params = [];
    let self = this;
    let urlParams = '';


    this.layerFromConsulta.analyzedAreaLoading = true;
    params.push('token=' + this.layerFromConsulta.token)
    this.layerFromConsulta.error = false;
    urlParams = '/service/upload/findgeojsonbytoken?' + params.join('&');

    try {
      let result = await this.http.get(urlParams, this.httpOptions).toPromise()

      this.layerFromConsulta.analyzedArea = result;
      this.layerFromConsulta.analyzedAreaLoading = false;
      this.loadLayerFromConsultaToMap();

    } catch (err) {
      self.layerFromConsulta.analyzedAreaLoading = false;
      self.layerFromConsulta.error = true;
    }

  }

  async analyzeUploadShape(fromConsulta = false) {
    let params = [];
    let self = this;
    let urlParams = '';

    let paramsCar = []
    let urlParamsCar = '';

    if (fromConsulta) {
      this.layerFromConsulta.analyzedAreaLoading = true;
      params.push('token=' + this.layerFromConsulta.token)
      this.layerFromConsulta.error = false;
      urlParams = '/service/upload/desmatperyear?' + params.join('&');

      try {
        let result = await this.http.get(urlParams, this.httpOptions).toPromise()
        this.layerFromConsulta.analyzedArea = result;
        this.layerFromConsulta.analyzedAreaLoading = false;

      } catch (err) {
        self.layerFromConsulta.analyzedAreaLoading = false;
        self.layerFromConsulta.error = true;
      }

      urlParamsCar = '/service/upload/carspertoken?' + params.join('&');
      let resultCar = await this.http.get(urlParamsCar).toPromise();

      this.layerFromConsulta.analyzedArea.car = resultCar


      this.googleAnalyticsService.eventEmitter("analyzeConsultaUploadLayer", "Analyze-Consulta-Upload", this.layerFromConsulta.token, 5);
    } else {
      this.layerFromUpload.analyzedAreaLoading = true;
      params.push('token=' + this.layerFromUpload.token)
      this.layerFromUpload.error = false;
      urlParams = '/service/upload/desmatperyear?' + params.join('&');

      try {
        let result = await this.http.get(urlParams, this.httpOptions).toPromise()
        this.layerFromUpload.analyzedArea = result;
        this.layerFromUpload.analyzedAreaLoading = false;
      } catch (err) {
        self.layerFromUpload.analyzedAreaLoading = false;
        self.layerFromUpload.error = true;
      }

      urlParamsCar = '/service/upload/carspertoken?' + params.join('&');
      let resultCar = await this.http.get(urlParamsCar).toPromise();
      this.layerFromUpload.analyzedArea.car = resultCar

      this.googleAnalyticsService.eventEmitter("analyzeUploadLayer", "Analyze-Upload", this.layerFromUpload.token, 6);
    }

  }

  changeTextUpload($e) {

    if (this.layerFromConsulta.error) {
      this.layerFromConsulta = {
        label: null,
        layer: null,
        checked: false,
        visible: null,
        loading: false,
        dragArea: true,
        error: false,
        strokeColor: '#257a33',
        token: '',
        analyzedAreaLoading: false,
        analyzedArea: {},
      };
    }
  }

  private getMetadata(metadata) {
    let _metadata = [];
    let lang = this.language;

    metadata.forEach(function (data) {
      _metadata.push({ title: data.title[lang], description: data.description[lang] });
    });

    return _metadata;
  }

  openDialogMetadata(layer) {

    let metadata = [];
    let self = this;
    let title = '';

    if (layer.hasOwnProperty('metadata')) {
      metadata = this.getMetadata(layer.metadata);
    } else {
      let selectedType = layer.selectedType;
      layer.types.forEach(function (type) {
        if (type.value == selectedType) {
          metadata = self.getMetadata(type.metadata);
        }
      });
    }
    let dialogRef = null;

    title = this.controls.label_metadata;

    if (window.innerWidth < this.breakpointMobile) {
      dialogRef = this.dialog.open(MetadataComponent, {
        width: '98%',
        minWidth: '95%',
        height: 'calc(100% - 5vh)',
        panelClass: 'full-width-dialog',
        data: { title: title, metadata: metadata }
      });
    } else {
      dialogRef = this.dialog.open(MetadataComponent, {
        width: 'calc(100% - 30vw)',
        height: 'calc(100% - 5vh)',
        data: { title: title, metadata: metadata }
      });
    }

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
    });
  }

  hasDownload(type, typeData) {
    return typeData.download.includes(type);
  }

  downloadCSV(layer) {

    this.loadingsDownload = true;
    let parameters = {
      "layer": layer,
      "selectedRegion": this.selectRegion,
      "times": this.selectedTimeFromLayerType(layer.selectedType) == undefined ? "1=1" : this.selectedTimeFromLayerType(layer.selectedType),
      "typeshape": 'csv'
    };

    let name = ""
    if (parameters.times.value != undefined) {
      name = parameters.layer.selectedType + "_" + parameters.times.value
    }
    else {
      name = parameters.layer.selectedType
    }


    this.http.post("/service/download/csv", parameters, { responseType: 'blob' })
      .toPromise()
      .then(blob => {
        saveAs(blob, name + '.csv');
        this.loadingsDownload = false;
      }).catch(err => this.loadingsDownload = false);
  }

  downloadSHP(layer, format) {
    this.loadingsDownload = true;
    let parameters = {
      "layer": layer,
      "selectedRegion": this.selectRegion,
      "times": this.selectedTimeFromLayerType(layer.selectedType),
      "typeshape": format
    };

    let name = ""
    if (parameters.times != undefined) {
      name = parameters.layer.selectedType + "_" + parameters.times.value
    }
    else {
      name = parameters.layer.selectedType
    }

    this.http.post("/service/download/shp", parameters, { responseType: 'blob' })
      .toPromise()
      .then(blob => {
        saveAs(blob, name + '.zip');
        this.loadingsDownload = false;
      }).catch(err => this.loadingsDownload = false);
  }

  buttonDownload(format, layer) {
    if (format === 'csv') {
      this.downloadCSV(layer);
    } else {
      this.downloadSHP(layer, format);
    }

    let register_event = format + "_" + layer.selectedType

    this.googleAnalyticsService.eventEmitter("downloadLayer", "Download", register_event, 3);

  }

  zoomIn(level = 0.7) {
    this.map.getView().setZoom(this.map.getView().getZoom() + level)
  }

  zoomOut(level = 0.7) {
    this.map.getView().setZoom(this.map.getView().getZoom() - level)
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerHeigth = window.innerHeight;
    if (window.innerWidth < this.breakpointMobile) {
      this.collapseLegends = false;
      this.collapseLayer = true;
      this.collapseCharts = true;
      this.currentZoom = 4;
    } else {
      this.collapseLayer = false;
      this.collapseCharts = false;
      this.currentZoom = 6;
    }

  }

  handleDrawer() {
    this.showDrawer = !this.showDrawer;
  }

  openTips() {
    this.showTips = !this.showTips;

    let dialog = this.dialog.open(TutorialsComponent, {
      width: 'calc(100% - 5vw)',
      height: 'calc(100% - 5vh)',
      data: { controls:this.controls }
    });

    dialog.afterClosed().subscribe(result => {
      this.showTips = !this.showTips;
    });
  }
  async openReport(params) {
    let coordinate = null;
    let layers = null;
    let paramsReport = null;
    let token = params.params.token;

    let dados = await this.http.get('/service/report/reportByToken/' + token).toPromise();

    if (Array.isArray(dados)) {
      paramsReport = JSON.parse(atob(dados[0].params))
      layers = paramsReport.layers;
    } else {
      console.log('Relatório não encontrado');
      return;
    }

    let prodes = layers.find(element => element.id === 'desmatamento_prodes');
    let deter = layers.find(element => element.id === 'desmatamento_deter');


    if (prodes.visible || deter.visible) {

      let isCampo = false;
      let isOficial = false;
      let isMunicipio = false;
      let isABC = false;

      if (prodes.selectedType == 'bi_ce_prodes_desmatamento_100_fip' || deter.selectedType == 'bi_ce_deter_desmatamento_100_fip') {
        isOficial = true;
      }

      if ((prodes.selectedType == 'bi_ce_prodes_desmatamento_pontos_campo_fip') ||
        (deter.selectedType == 'bi_ce_deter_desmatamento_pontos_campo_fip')) {
        isCampo = true;
      }

      if ((prodes.selectedType == 'prodes_por_region_city_fip_img') || (prodes.selectedType == 'prodes_por_region_state_fip_img')) {
        isMunicipio = true;
      }

      if (prodes.selectedType == 'bi_ce_prodes_desmatamento_abc_fip') {
        isABC = true;
      }

      if (isMunicipio) {
      }

      if (isABC) {
        if (prodes.visible && (prodes.selectedType == 'bi_ce_prodes_desmatamento_abc_fip')) {
          this.dataForDialog = paramsReport;
          this.dataForDialog.origin_table = 'PRODES';
          this.dataForDialog.dataFormatada = this.dataForDialog.data_detec == '' ? this.minireportText.undisclosed_message : this.datePipe.transform(new Date(this.dataForDialog.data_detec), 'dd/MM/yyyy');
          this.dataForDialog.coordinate = coordinate;
          this.dataForDialog.datePipe = this.datePipe;
          this.dataForDialog.year = new Date(this.dataForDialog.data_detec).getFullYear();

          this.openDialog();

        }
      }

      if (isCampo) {

        let open = false;
        if (prodes.visible && (prodes.selectedType == 'bi_ce_prodes_desmatamento_pontos_campo_fip')) {

          isOficial = false;
          this.dataForDialog = paramsReport;
          this.dataForDialog.coordinate = coordinate;
          this.dataForDialog.year = new Date(this.dataForDialog.data_detec).getFullYear();
          this.dataForDialog.layers = layers;
          this.dataForDialog.datePipe = this.datePipe;
          open = true;
          this.openDialog();
        }

        if (!open && deter.visible && (deter.selectedType == 'bi_ce_deter_desmatamento_pontos_campo_fip')) {
          isOficial = false;
          this.dataForDialog = paramsReport;
          this.dataForDialog.coordinate = coordinate;
          this.dataForDialog.year = new Date(this.dataForDialog.data_detec).getFullYear();
          this.dataForDialog.layers = layers;
          this.dataForDialog.datePipe = this.datePipe;
          this.openDialog();
        }
      }

      if (isOficial) {
        let openOficial = false;
        if (prodes.visible && (prodes.selectedType == 'bi_ce_prodes_desmatamento_100_fip')) {
          this.dataForDialog = paramsReport;
          this.dataForDialog.coordinate = coordinate;
          this.dataForDialog.datePipe = this.datePipe;
          this.dataForDialog.layers = layers;
          this.dataForDialog.year = this.selectedTimeFromLayerType('bi_ce_prodes_desmatamento_100_fip').year;
          openOficial = true;
          this.openDialog();
        }


        if (!openOficial && deter.visible && (deter.selectedType == 'bi_ce_deter_desmatamento_100_fip')) {
          this.dataForDialog = paramsReport;
          this.dataForDialog.coordinate = coordinate;
          this.dataForDialog.datePipe = this.datePipe;
          this.dataForDialog.layers = layers;
          this.dataForDialog.year = new Date(this.dataForDialog.data_detec).getFullYear();
          this.openDialog();
        }

      }

    }
  }
  async openRegionReport() {
    let dados = {};
    let url = '/service/deforestation/regionreport?';

    dados['ranking'] = null;

    if (this.selectRegion.type === 'state') {
      url += 'type=state&region=' + this.selectRegion.value.toLowerCase();
      dados['ranking'] = { table: this.chartResultCities, desmatInfo: this.desmatInfo };
    } else if (this.selectRegion.type === 'city') {
      url += 'type=city&region=' + this.selectRegion.cd_geocmu.toLowerCase();
    } else {
      return;
    }

    dados['region'] = await this.http.get(url).toPromise();

    dados['language'] = 'lang=' + this.language;

    if (dados) {
      dados['graphic'] = {
        type: this.dataSeries.type,
        data: this.dataSeries,
        options: this.optionsTimeSeries
      };
    }

    if (window.innerWidth < this.breakpointMobile) {
      this.dialog.open(RegionReportMobileComponent, {
        width: '98%',
        minWidth: '95%',
        height: 'calc(100% - 5vh)',
        panelClass: 'full-width-dialog',
        data: { dados }
      });
    } else {
      this.dialog.open(RegionReportComponent, {
        width: 'calc(100% - 5vw)',
        height: 'calc(100% - 5vh)',
        data: { dados }
      });
    }

  }
  async printRegionsIdentification(token) {


    let language = this.language;
    let self = this;

    let dd = {
      pageSize: { width: 400, height: 400 },

      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'portrait',

      content: [],
      styles: {
        titleReport: {
          fontSize: 16,
          bold: true
        },
        textFooter: {
          fontSize: 9
        },
        textImglegend: {
          fontSize: 9
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        data: {
          bold: true,
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        codCar: {
          fontSize: 11,
          bold: true,
        },
        textObs: {
          fontSize: 11,
        },
        tableDpat: {
          margin: [0, 5, 0, 15],
          fontSize: 11,
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        token: {
          bold: true,
          fontSize: 16,
        },
        metadata: {
          background: '#0b4e26',
          color: '#fff'
        }
      }
    }

    // @ts-ignore
    dd.content.push({
      image: logos.logoDPAT,
      width: 130,
      alignment: 'center'
    });
    dd.content.push({ text: logos.upload.description[language], alignment: 'center', margin: [10, 10, 20, 0] });

    dd.content.push({ text: token, alignment: 'center', style: 'token', margin: [20, 20, 20, 0] });

    // @ts-ignore
    dd.content.push({ qr: 'https://www.cerradodpat.org/#/regions/' + token, fit: '150', alignment: 'center' });
    // @ts-ignore
    dd.content.push({ text: 'https://www.cerradodpat.org/#/regions/' + token, alignment: 'center', style: 'textFooter', margin: [20, 10, 20, 60] });

    const filename = logos.upload.title[language] + ' - ' + token + '.pdf'
    pdfMake.createPdf(dd).download(filename);
  }
  async printAnalyzedAreaReport(fromConsulta = false) {

    this.googleAnalyticsService.eventEmitter("printAnalyzedAreaReport", "Print_Report", this.layerFromConsulta.token, 10);

    let language = this.language;
    let self = this;
    let layer = null;
    let isFromConsulta = false;
    if (fromConsulta) {
      isFromConsulta = true;
      layer = this.layerFromConsulta;
    } else {
      layer = this.layerFromUpload;
    }

    this.loadingPrintReport = true;

    let dd = {
      pageSize: 'A4',

      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'portrait',

      // [left, top, right, bottom]
      pageMargins: [40, 70, 40, 80],

      header: {
        margin: [24, 10, 24, 30],
        columns: [
          {
            image: logos.logoDPAT,
            width: 130
          },
          {
            // [left, top, right, bottom]
            margin: [65, 15, 10, 10],
            text: this.titlesLayerBox.label_analyzed_area_title.toUpperCase(),
            style: 'titleReport',
          },

        ]
      },
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: '*',
            body: [
              [
                { image: logos.signature, colSpan: 3, alignment: 'center', fit: [400, 45] },
                {},
                {},
              ],
              [
                { text: 'https://cerradodpat.org', alignment: 'left', style: 'textFooter', margin: [60, 0, 0, 0] },
                { text: moment().format('DD/MM/YYYY HH:mm:ss'), alignment: 'center', style: 'textFooter', margin: [0, 0, 0, 0] },
                { text: logos.page.title[language] + currentPage.toString() + logos.page.of[language] + '' + pageCount, alignment: 'right', style: 'textFooter', margin: [0, 0, 60, 0] },
              ],
            ]
          },
          layout: 'noBorders'
        };
      },
      content: [],
      styles: {
        titleReport: {
          fontSize: 16,
          bold: true
        },
        textFooter: {
          fontSize: 9
        },
        textImglegend: {
          fontSize: 9
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        data: {
          bold: true,
        },
        subheader: {
          fontSize: 14,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        codCar: {
          fontSize: 11,
          bold: true,
        },
        textObs: {
          fontSize: 11,
        },
        tableDpat: {
          margin: [0, 5, 0, 15],
          fontSize: 11,
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        tableCar: {
          fontSize: 9,
        },
        metadata: {
          background: '#0b4e26',
          color: '#fff'
        },
        bold: {
          bold: true,
        }
      }
    }
    dd.content.push({ text: this.titlesLayerBox.label_total_area + this.decimalPipe.transform(layer.analyzedArea.shape_upload.area_upload, '1.2-2') + '  km²', style: 'subheader' });

    if (layer.analyzedArea.car.length > 0) {
      dd.content.push({ text: self.titlesLayerBox.car_title_report, style: 'subheader', alignment: 'center' });
      let tableCar = {
        style: 'tableCar',
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: [100, 52, 52, 52, 50, 50, 50],
          body: [],
          margin: 10
        }
      };
      let headers = []
      for (let [index, header] of self.titlesLayerBox.car_table_headers.entries()) {
        headers.push(
          { text: header, alignment: 'center' }
        );
      }
      tableCar.table.body.push(headers);

      for (let [index, car] of layer.analyzedArea.car.entries()) {
        tableCar.table.body.push([
          { text: car.cod_car, alignment: 'left', style: 'bold' },
          { text: self.decimalPipe.transform(car.area_car, '1.2-2') + ' km²', alignment: 'center' },
          { text: self.decimalPipe.transform(car.area_desmat_per_car, '1.2-2') + ' km²', alignment: 'center', style: 'bold' },
          { text: self.decimalPipe.transform(car.area_rl, '1.2-2') + ' km²', alignment: 'center' },
          { text: self.decimalPipe.transform(car.area_desmat_rl, '1.2-2') + ' km²', alignment: 'center' },
          { text: self.decimalPipe.transform(car.area_app, '1.2-2') + ' km²', alignment: 'center' },
          { text: self.decimalPipe.transform(car.area_desmat_app, '1.2-2') + ' km²', alignment: 'center' }
        ]);
      }
      dd.content.push(tableCar);
    }
    if (layer.analyzedArea.deter.length > 0) {
      dd.content.push({ text: self.titlesLayerBox.table_deter_title, style: 'subheader', alignment: 'center' });
      let tableDeter = {
        style: 'tableCounty',
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          body: [],
          margin: 10
        }
      };
      tableDeter.table.body.push([
        { text: self.titlesLayerBox.header_table_deforested[0], alignment: 'center' },
        { text: self.titlesLayerBox.header_table_deforested[1], alignment: 'center' }
      ]);
      for (let [index, area] of layer.analyzedArea.deter.entries()) {
        tableDeter.table.body.push([
          { text: area.year, alignment: 'center' },
          { text: self.decimalPipe.transform(area.area_desmat, '1.2-2') + ' km²', alignment: 'center' }
        ]);
      }
      dd.content.push(tableDeter);
    }
    if (layer.analyzedArea.prodes.length > 0) {
      dd.content.push({ text: self.titlesLayerBox.table_prodes_title, style: 'subheader', alignment: 'center' });
      let tableProdes = {
        style: 'tableCounty',
        layout: 'lightHorizontalLines',
        table: {
          headerRows: 1,
          widths: ['*', '*'],
          body: [],
          margin: 10
        }
      };
      tableProdes.table.body.push([
        { text: self.titlesLayerBox.header_table_deforested[0], alignment: 'center' },
        { text: self.titlesLayerBox.header_table_deforested[1], alignment: 'center' }
      ]);
      for (let [index, area] of layer.analyzedArea.prodes.entries()) {
        tableProdes.table.body.push([
          { text: area.year, alignment: 'center' },
          { text: self.decimalPipe.transform(area.area_desmat, '1.2-2') + ' km²', alignment: 'center' }
        ]);
      }
      dd.content.push(tableProdes);
    }
    if (layer.analyzedArea.regions_intersected.hasOwnProperty('city')) {
      dd.content.push({ text: self.titlesLayerBox.table_city_title, style: 'subheader', alignment: 'center' });
      dd.content.push({ text: self.getCitiesAnalyzedArea(isFromConsulta), alignment: 'center' });
      // let tableCities = {
      //   style: 'tableCounty',
      //   layout: 'lightHorizontalLines',
      //   table: {
      //     headerRows: 1,
      //     widths: ['*', '*'],
      //     body: [],
      //     margin: 10
      //   }
      // };
      // tableCities.table.body.push([
      //   { text: '#', alignment: 'center' },
      //   { text: self.titlesLayerBox.header_table_city[0], alignment: 'center' }
      // ]);
      // for (let [index, city] of layer.analyzedArea.regions_intersected.city.entries()) {
      //   tableCities.table.body.push([
      //     { text: index + 1, alignment: 'center' },
      //     { text: city.name, alignment: 'left' }
      //   ]);
      // }
      // dd.content.push(tableCities);
    }
    if (layer.analyzedArea.regions_intersected.hasOwnProperty('state')) {
      dd.content.push({ text: self.titlesLayerBox.table_state_title, style: 'subheader', alignment: 'center' });
      dd.content.push({ text: self.getStatesAnalyzedArea(isFromConsulta), alignment: 'center' });
      // let tableStates = {
      //   style: 'tableCounty',
      //   layout: 'lightHorizontalLines',
      //   table: {
      //     headerRows: 1,
      //     widths: ['*', '*'],
      //     body: [],
      //     margin: 10
      //   }
      // };
      // tableStates.table.body.push([
      //   { text: '#', alignment: 'center' },
      //   { text: self.titlesLayerBox.header_table_state[0], alignment: 'center' }
      // ]);
      // for (let [index, state] of layer.analyzedArea.regions_intersected.state.entries()) {
      //   tableStates.table.body.push([
      //     { text: index + 1, alignment: 'center' },
      //     { text: state.name, alignment: 'left' }
      //   ]);
      // }
      // dd.content.push(tableStates);
    }

    // @ts-ignore
    dd.content.push({ text: layer.token, alignment: 'center', style: 'textFooter', margin: [25, 30, 20, 10], pageBreak: false });
    // @ts-ignore
    dd.content.push({ qr: 'https://www.cerradodpat.org/#/regions/' + layer.token, fit: '150', alignment: 'center' });
    // @ts-ignore
    dd.content.push({ text: 'https://www.cerradodpat.org/#/regions/' + layer.token, alignment: 'center', margin: [0, 15, 10, 0], style: 'textFooter' });
    let filename = this.titlesLayerBox.label_analyzed_area_title.toLowerCase() + ' - ' + layer.token + '.pdf'
    pdfMake.createPdf(dd).download(filename);
    this.loadingPrintReport = false;
  }
  getCitiesAnalyzedArea(fromConsulta = false) {
    let cities = '';
    if (fromConsulta) {
      if (this.layerFromConsulta.analyzedArea.regions_intersected.hasOwnProperty('city')) {
        for (let [index, city] of this.layerFromConsulta.analyzedArea.regions_intersected.city.entries()) {
          let citiesCount = this.layerFromConsulta.analyzedArea.regions_intersected.city.length;
          if (citiesCount === 1) {
            cities += city.name + '.';
            return cities;
          }
          if (index === citiesCount - 1) {
            cities += city.name + '.';
          } else {
            cities += city.name + ', ';
          }
        }
      }
    } else {
      if (this.layerFromUpload.analyzedArea.regions_intersected.hasOwnProperty('city')) {
        for (let [index, city] of this.layerFromUpload.analyzedArea.regions_intersected.city.entries()) {
          let citiesCount = this.layerFromUpload.analyzedArea.regions_intersected.city.length;
          if (citiesCount === 1) {
            cities += city.name + '.';
            return cities;
          }
          if (index === citiesCount - 1) {
            cities += city.name + '.';
          } else {
            cities += city.name + ', ';
          }
        }
      }
    }

    return cities;
  }
  getStatesAnalyzedArea(fromConsulta = false) {
    let states = '';
    if (fromConsulta) {
      if (this.layerFromConsulta.analyzedArea.regions_intersected.hasOwnProperty('state')) {
        for (let [index, state] of this.layerFromConsulta.analyzedArea.regions_intersected.state.entries()) {
          let statesCount = this.layerFromConsulta.analyzedArea.regions_intersected.state.length;
          if (statesCount === 1) {
            states += state.name + '.';
            return states;
          }
          if (index === statesCount - 1) {
            states += state.name + '.';
          } else {
            states += state.name + ', ';
          }
        }
      }
    } else {
      if (this.layerFromUpload.analyzedArea.regions_intersected.hasOwnProperty('state')) {
        for (let [index, state] of this.layerFromUpload.analyzedArea.regions_intersected.state.entries()) {
          let statesCount = this.layerFromUpload.analyzedArea.regions_intersected.state.length;
          if (statesCount === 1) {
            states += state.name + '.';
            return states;
          }
          if (index === statesCount - 1) {
            states += state.name + '.';
          } else {
            states += state.name + ', ';
          }
        }
      }
    }

    return states;
  }
  openCarReport(fromConsulta = false) {
    const self = this;
    let carDialog = null;
    let isFromConsulta = false;
    if (fromConsulta) {
      isFromConsulta = true;
      this.layerFromConsulta.analyzedArea['table_title'] = this.titlesLayerBox.car_title_report;
      this.layerFromConsulta.analyzedArea['table_headers'] = this.titlesLayerBox.car_table_headers;
      carDialog = this.dialog.open(ReportCarComponent, {
        width: 'calc(100% - 5vw)',
        height: 'calc(100% - 5vh)',
        data: { dados: this.layerFromConsulta.analyzedArea }
      });

    } else {
      this.layerFromUpload.analyzedArea['table_title'] = this.titlesLayerBox.car_title_report;
      this.layerFromUpload.analyzedArea['table_headers'] = this.titlesLayerBox.car_table_headers;
      carDialog = this.dialog.open(ReportCarComponent, {
        width: 'calc(100% - 5vw)',
        height: 'calc(100% - 5vh)',
        data: { dados: this.layerFromUpload.analyzedArea }
      });
    }

    carDialog.componentInstance.print.subscribe(() => {
      self.printAnalyzedAreaReport(isFromConsulta);
    });
  }

  clearArea(fromConsulta = false) {
    if (fromConsulta) {
      this.map.removeLayer(this.layerFromConsulta.layer);
      this.layerFromConsulta.visible = false;
      this.layerFromConsulta.checked = false;
      this.layerFromConsulta.token = '';
      this.layerFromConsulta.analyzedArea = {}
      this.updateRegion(this.defaultRegion);
    } else {
      this.layerFromUpload.visible = false;
      this.layerFromUpload.checked = false;
      this.map.removeLayer(this.layerFromUpload.layer);
      this.layerFromUpload.analyzedArea = {}
      this.updateRegion(this.defaultRegion);
    }
  }

  clearUpload(fromConsulta = false) {
    if (fromConsulta) {
      this.layerFromConsulta.analyzedArea = {}
      this.map.removeLayer(this.layerFromConsulta.layer);
      this.layerFromConsulta.visible = false;
      this.layerFromConsulta.checked = false;
      this.layerFromConsulta.token = '';
    } else {
      this.layerFromUpload.analyzedArea = {}
      this.map.removeLayer(this.layerFromUpload.layer);
      this.layerFromUpload.visible = false;
      this.layerFromUpload.checked = false;
    }
    this.updateRegion(this.defaultRegion);
  }
  async openCharts(title, description, data, type, options) {
    let ob = {
      title: title,
      description: description,
      type: type,
      data: data,
      options: options,
    }
    this.dialog.open(ChartsComponent, {
      width: 'calc(100% - 5vw)',
      height: 'calc(100% - 5vh)',
      data: { ob }
    });
  }
  ngOnInit() {

    let descriptorURL = '/service/map/descriptor' + this.getServiceParams();

    this.http.get(descriptorURL).subscribe(result => {
      this.descriptor = result;
      this.regionFilterDefault = this.descriptor.regionFilterDefault;

      for (let group of this.descriptor.groups) {
        for (let layer of group.layers) {
          if (layer.id != 'satelite') {
            for (let type of layer.types) {
              type.urlLegend = this.urls[0] + '?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&layer=' + type.value + '&format=image/png';
            }
            this.layersNames.push(layer);
          }
          // else {
          //   this.layersNames.push(layer);
          // }

          for (let layerType of layer.types) {
            layerType.visible = false;
            if (layer.selectedType == layerType.value) {
              layerType.visible = layer.visible;
            }

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

    // keep height of window
    this.innerHeigth = window.innerHeight;

    if (window.innerWidth < 1600) {
      this.collapseLegends = false;
      this.collapseLayer = true;
      this.collapseCharts = true;
      this.currentZoom = 5.3;
    } else {
      this.currentZoom = 5.8;
    }

    // Register of SVG icons
    this.matIconRegistry.addSvgIcon(
      `info`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/info.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `shp`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/shp.svg')
    );
    this.matIconRegistry.addSvgIcon(
      `csv`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/img/csv.svg')
    );

    // if (window.innerWidth < this.breakpointMobile) {
    //   if (!this.router.url.includes('mobile')) {
    //     this.router.navigate(['/mobile']);
    //   }
    // }

    const self = this;
    self.route.paramMap.subscribe(function (params) {
      if (self.router.url.includes('plataforma')) {
        if (params.keys.includes('token')) {
          if (window.innerWidth < self.breakpointMobile) {
            self.router.navigate(['plataforma/' + params.get('token')]);
          } else {
            self.openReport(params);
          }
        }
      }

      if (self.router.url.includes('regions')) {
        if (window.innerWidth < self.breakpointMobile) {
          self.router.navigate(['regions/' + params.get('token')]);
        } else {
          self.selectedIndexConteudo = 1;
          self.selectedIndexUpload = 1;
          self.layerFromConsulta.token = params.get('token');
          self.searchUploadShape();
          self.analyzeUploadShape(true);
          self.handleDrawer();
        }
      }
    });
  }
  ngAfterViewChecked() {
    this.changeDetector.detectChanges();
  }

}

@Component({
  selector: 'app-map',
  templateUrl: './dialog-laudo.html',
  styleUrls: ['./map.component.css']
})
export class DialogOverviewExampleDialog implements OnInit, OnDestroy {
  indexAccordion = 0;

  images: any[];
  defaultImg = '';
  urlSentinel: Array<{ src: string; caption: string; thumb: string }> = [];
  vetBfast: Array<{ src: string; caption: string; thumb: string }> = [];
  vetSuscept: Array<{ src: string; caption: string; thumb: string }> = [];
  vetCar: Array<{ src: string; caption: string; thumb: string }> = [];
  vetABC: Array<{ src: string; caption: string; thumb: string }> = [];
  vetEspecial: Array<{ id: string; src: string; caption: string; thumb: string }> = [];
  dataBfast: any = {};
  dataSuscept: any = {};
  dataCampo: any = [];
  dataEspecial: any = null;

  infoDesmat: any = {};
  infoVisita: any = {};
  urlsLandSat: any = [];
  dadosValidacao_Amostral: any = {};
  tmpModis: any = [];

  dataTimeseriesModis: any = {};
  optionsTimeSeries: any = {};

  textOnDialog = {} as any;

  carData: any = [];
  abcData: any = [];
  loading: boolean;

  svgLoading: string;

  albumLandsat: Array<{ src: string; caption: string; thumb: string }> = [];

  galleryOptions: NgxGalleryOptions[];
  galleryDrones: NgxGalleryImage[];
  galleryCamera: NgxGalleryImage[];
  galleryVideos: NgxGalleryImage[];

  httpOptions: any;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private _lightbox: Lightbox,
    private decimalPipe: DecimalPipe,
    public googleAnalyticsService: GoogleAnalyticsService
  ) {
    this.defaultImg = '';
    this.dataSuscept = {};
    this.dataBfast = {};
    this.urlsLandSat = [];
    this.dataCampo = [];
    this.infoDesmat = {};
    this.infoVisita = {};
    this.dadosValidacao_Amostral = {};
    this.dataTimeseriesModis = {};
    this.textOnDialog = data.textosDaDialog;
    this.tmpModis = [];
    this.loading = false;

    this.dataEspecial = null;

    this.svgLoading = "/assets/img/loading.svg";
    this.initGallery();
    const timeout = 2000 * 60 * 30;
    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', timeout: `${timeout}` })
    };
  }


  initGallery() {
    this.galleryDrones = [];
    this.galleryCamera = [];
    this.galleryVideos = [];
  }

  onNoClick(): void {
    this.cdRef.detach();
    this.dialogRef.close();
  }

  goToDoc(type) {

    if (type == 'class') {
      window.open('assets/documents/qualificacao_poligonos_' + this.data.language + '.pdf', '_blank');
    }
    else if (type == 'bfast') {
      window.open('assets/documents/' + this.data.language + '_bfast.pdf', '_blank');
    }
    else if (type == 'suscept') {
      window.open('assets/documents/' + this.data.language + '_suscept.pdf', '_blank');
    }
    else if (type == 'abc') {
      window.open('https://www.cnabrasil.org.br/projetos-e-programas/abc-cerrado', '_blank');
    }
  }

  private getServiceParams() {
    let params = [];

    if (this.data != undefined) {
      params.push('origin=' + this.data.origin_table.toLowerCase());
      params.push('gid=' + this.data.gid);

      if (this.data.origin_table.toLowerCase() === 'prodes') {
        params.push("year=" + this.data.year);
      }
      else {
        params.push('year=2018');
      }

      params.push('lang=' + this.data.language);

    }

    let urlParams = '?' + params.join('&');

    return urlParams;
  }

  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  async printReport() {

    let register_event = this.data.origin_table + "_" + this.data.gid

    this.googleAnalyticsService.eventEmitter("printPolygonReport", "Print_Report", register_event, 8);

    let language = this.data.language;
    let self = this;
    this.loading = true;
    let polygonClass = {};

    if (this.infoDesmat.pathclassefip != '1') {
      polygonClass = {
        image: await this.getBase64ImageFromUrl(this.infoDesmat.pathclassefip),
        width: 150,
        margin: [0, 0, 100, 0],
      }
    }

    let dd = {
      pageSize: 'A4',

      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'portrait',

      // [left, top, right, bottom]
      pageMargins: [40, 70, 40, 80],

      header: {
        margin: [24, 10, 24, 30],
        columns: [
          {
            image: logos.logoDPAT,
            width: 130
          },
          {
            // [left, top, right, bottom]
            margin: [65, 15, 10, 10],
            text: this.textOnDialog.title.toUpperCase(),
            style: 'titleReport',
          },

        ]
      },
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: '*',
            body: [
              [
                { image: logos.signature, colSpan: 3, alignment: 'center', fit: [400, 45] },
                {},
                {},
              ],
              [
                { text: 'https://cerradodpat.org', alignment: 'left', style: 'textFooter', margin: [60, 0, 0, 0] },
                { text: moment().format('DD/MM/YYYY HH:mm:ss'), alignment: 'center', style: 'textFooter', margin: [0, 0, 0, 0] },
                { text: logos.page.title[language] + currentPage.toString() + logos.page.of[language] + '' + pageCount, alignment: 'right', style: 'textFooter', margin: [0, 0, 60, 0] },
              ],
            ]
          },
          layout: 'noBorders'
        };
      },
      content: [
        { text: this.textOnDialog.information_tab.title_tab, style: 'subheader' },
        {
          columns: [
            {
              style: 'tableDpat',
              layout: 'noBorders',
              table: {
                body: [
                  [
                    { text: this.textOnDialog.information_tab.metadados_label.toUpperCase(), alignment: 'left', colSpan: 2 },
                    {},
                  ],
                  [
                    this.textOnDialog.information_tab.polygon_label,
                    { text: this.data.origin_table + '-CERRADO', alignment: 'left', style: 'data' },
                  ],
                  [
                    this.textOnDialog.information_tab.area_label,
                    { text: this.decimalPipe.transform(this.infoDesmat.area, '1.2-3') + ' ' + this.textOnDialog.information_tab.unit_measure, alignment: 'left', style: 'data' },
                  ],
                  [
                    this.textOnDialog.information_tab.municipio_label,
                    { text: this.data.municipio + ' - ' + this.data.uf, alignment: 'left', style: 'data' },
                  ],
                  [
                    this.textOnDialog.information_tab.detection_date_label,
                    { text: this.data.dataFormatada, alignment: 'left', style: 'data' },
                  ],
                  [
                    this.textOnDialog.information_tab.latitude_label,
                    { text: this.decimalPipe.transform(this.infoDesmat.latitude, '1.3-6'), alignment: 'left', style: 'data' },
                  ],
                  [
                    this.textOnDialog.information_tab.longitude_label,
                    { text: this.decimalPipe.transform(this.infoDesmat.longitude, '1.3-6'), alignment: 'left', style: 'data' },
                  ],
                ]
              }
            },
            polygonClass,
          ],
        },
        {
          image: await this.getBase64ImageFromUrl(this.urlSentinel[0].thumb),
          width: 400,
          alignment: 'center'
        },
        { text: this.textOnDialog.information_tab.landsat_image_description + ' ' + this.data.origin_table + '-Cerrado', alignment: 'center', style: 'textImglegend', pageBreak: 'after' },
      ],
      styles: {
        titleReport: {
          fontSize: 16,
          bold: true
        },
        textFooter: {
          fontSize: 9
        },
        textImglegend: {
          fontSize: 9
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        data: {
          bold: true,
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        codCar: {
          fontSize: 11,
          bold: true,
        },
        textObs: {
          fontSize: 11,
        },
        tableDpat: {
          margin: [0, 5, 0, 15],
          fontSize: 11,
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        metadata: {
          background: '#0b4e26',
          color: '#fff'
        }
      }
    }

    if (this.dataEspecial) {
      let columns = [];
      let images = [];

      dd.content.push({ text: this.textOnDialog.especial_area.title_tab, style: 'subheader' });

      if (this.dataEspecial.ti) {

        if (this.dataEspecial.ti.show) {
          images.push(
            {
              image: await self.getBase64ImageFromUrl(self.dataEspecial.ti.thumb),
              width: 180,
              alignment: 'center'
            }
          );

          if (this.dataEspecial.ti.legendDesmatamento) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.ti.legendDesmatamento),
                width: 180,
                alignment: 'center'
              }
            );
          }

          if (this.dataEspecial.ti.legendEspecial) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.ti.legendEspecial),
                width: 180,
                alignment: 'center'
              }
            );
          }

        }

        columns.push(
          [
            { text: this.textOnDialog.especial_area.titleTI, alignment: 'left', margin: [0, 25, 0, 10] },
            { text: this.dataEspecial.ti.ti_nom, alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            { text: this.textOnDialog.especial_area.distancia + ' ' + this.dataEspecial.ti.ti_dist + ' km', alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            // images,
          ],
        );
      }
      if (this.dataEspecial.ucus) {

        if (this.dataEspecial.ucus.show) {
          images.push(
            {
              image: await self.getBase64ImageFromUrl(self.dataEspecial.ucus.thumb),
              width: 180,
              alignment: 'center'
            }
          );

          if (this.dataEspecial.ucus.legendDesmatamento) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.ucus.legendDesmatamento),
                width: 180,
                alignment: 'center'
              }
            );
          }

          if (this.dataEspecial.ucus.legendEspecial) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.ucus.legendEspecial),
                width: 180,
                alignment: 'center'
              }
            );
          }

        }

        columns.push(
          [
            { text: this.textOnDialog.especial_area.titleUCUS, alignment: 'left', margin: [0, 25, 0, 10] },
            { text: this.dataEspecial.ucus.ucus_nom, alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            { text: this.textOnDialog.especial_area.distancia + ' ' + this.dataEspecial.ucus.ucus_dist + ' km', alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            // images,
          ],
        );
      }

      dd.content.push({ columns: columns });
      // @ts-ignore
      dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 2 }] });

      columns = [];
      images = [];
      if (this.dataEspecial.ucpi) {

        if (this.dataEspecial.ucpi.show) {
          images.push(
            {
              image: await self.getBase64ImageFromUrl(self.dataEspecial.ucpi.thumb),
              width: 180,
              alignment: 'center'
            }
          );

          if (this.dataEspecial.ucpi.legendDesmatamento) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.ucpi.legendDesmatamento),
                width: 180,
                alignment: 'center'
              }
            );
          }

          if (this.dataEspecial.ucpi.legendEspecial) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.ucpi.legendEspecial),
                width: 180,
                alignment: 'center'
              }
            );
          }

        }

        columns.push(
          [
            { text: this.textOnDialog.especial_area.titleUCPI, alignment: 'left', margin: [0, 25, 0, 10] },
            { text: this.dataEspecial.ucpi.ucpi_nom, alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            { text: this.textOnDialog.especial_area.distancia + ' ' + this.dataEspecial.ucpi.ucpi_dist + ' km', alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            // images,
          ],
        );
      }
      if (this.dataEspecial.q) {
        if (this.dataEspecial.q.show) {
          images.push(
            {
              image: await self.getBase64ImageFromUrl(self.dataEspecial.q.thumb),
              width: 180,
              alignment: 'center'
            }
          );

          if (this.dataEspecial.q.legendDesmatamento) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.q.legendDesmatamento),
                width: 180,
                alignment: 'center'
              }
            );
          }

          if (this.dataEspecial.q.legendEspecial) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.q.legendEspecial),
                width: 180,
                alignment: 'center'
              }
            );
          }

        }
        columns.push(
          [
            { text: this.textOnDialog.especial_area.titleQ, alignment: 'left', margin: [0, 25, 0, 10] },
            { text: this.dataEspecial.ucus.q_nom, alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            { text: this.textOnDialog.especial_area.distancia + ' ' + this.dataEspecial.q.q_dist + ' km', alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            // images,
          ],
        );
      }

      dd.content.push({ columns: columns });
      // @ts-ignore
      dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 2 }] });
    }

    if (this.carData.length > 0 && this.data.year >= 2013) {
      // @ts-ignore
      dd.content.push({ text: this.textOnDialog.car_tab.title_tab, style: 'subheader', margin: [0, 25, 0, 10] })

      for (const [index, item] of this.carData.entries()) {
        let columns = [];

        let nascente = [];
        let area_rl = [];
        let area_desmat_app = [];

        if (item.metaData.qnt_nascente || item.metaData.qnt_nascente > 0) {
          nascente.push(self.textOnDialog.car_tab.nascente_car_label);
          nascente.push({ text: item.metaData.qnt_nascente, alignment: 'left', style: 'data' });
        } else {
          nascente.push({}, {});
        }
        if (item.metaData.area_rl || item.metaData.area_desmat_rl > 0) {
          area_rl.push(self.textOnDialog.car_tab.display_rl_message[0]);
          area_rl.push({
            text: self.decimalPipe.transform(item.metaData.area_desm, '1.2-3') +
              self.textOnDialog.car_tab.display_rl_message[1] +
              item.metaData.percentRL + this.textOnDialog.car_tab.display_rl_message[2],
            alignment: 'left',
            style: 'data'
          }
          );
        } else {
          area_rl.push({}, {});
        }
        if (item.metaData.area_desmat_app && item.metaData.area_desmat_app > 0) {
          area_desmat_app.push(this.textOnDialog.car_tab.display_app_message[0]);
          area_desmat_app.push({
            text: this.decimalPipe.transform(item.metaData.area_desmat_app, '1.2-3') + ' ' +
              this.textOnDialog.car_tab.display_app_message[1] + ' ' +
              item.metaData.percentAPP + ' ' + this.textOnDialog.car_tab.display_app_message[2],
            alignment: 'left',
            style: 'data'
          }
          );
        } else {
          area_desmat_app.push({}, {});
        }

        let legend = [];

        if (item.imgsCar.legendDesmatamento) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsCar.legendDesmatamento),
              fit: [170, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsCar.legendCar) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsCar.legendCar),
              fit: [102, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsCar.legendAPP) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsCar.legendAPP),
              fit: [170, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsCar.legendRL) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsCar.legendRL),
              fit: [87, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsCar.legendNascente) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsCar.legendNascente),
              fit: [102, 20],
              alignment: 'left'
            }
          );
        }

        if (item.metaData.percentDesmat !== '') {
          legend.push(
            {
              text: self.textOnDialog.car_tab.display_car_description_message[0] +
                self.data.origin_table + ' -CERRADO' +
                self.textOnDialog.car_tab.display_car_description_message[1] +
                item.metaData.percentDesmat +
                self.textOnDialog.car_tab.display_car_description_message[2],
              alignment: 'justify',
              style: 'textObs',
              // [left, top, right, bottom]
              margin: [2, 0, 5, 0],
            },
          );
        }
        // @ts-ignore
        dd.content.push({ text: self.textOnDialog.car_tab.title_info.toUpperCase(), alignment: 'left', margin: [0, 8, 0, 0] });

        // @ts-ignore
        dd.content.push({ text: self.textOnDialog.car_tab.cod_car_label + ' ' + item.metaData.cod_car, alignment: 'left', style: 'codCar', margin: [0, 8, 0, 5] });

        let table = {
          style: 'tableDpat', layout: 'noBorders', widths: [150], table: {
            body: [
              [
                self.textOnDialog.car_tab.area_car_label,
              ],
              [
                { text: self.decimalPipe.transform(item.metaData.area_car, '1.2-3') + '  km²', alignment: 'left', style: 'data' },
              ],
              [
                self.textOnDialog.car_tab.reference_date_car_label,
              ],
              [
                { text: item.metaData.dataRefFormatada, alignment: 'left', style: 'data' },
              ],
              [
                nascente[0],
              ],
              [
                nascente[1],
              ],
              [
                area_rl[0],
              ],
              [
                area_rl[1],
              ],
              [
                area_desmat_app[0]
              ],
              [
                area_desmat_app[1]
              ]
            ]
          }
        };
        columns.push(
          table,
          {
            image: await self.getBase64ImageFromUrl(self.vetCar[index].thumb),
            width: 150,
            margin: 5,
            alignment: 'center'
          },
          legend
        );
        dd.content.push({ columns: columns })
        // @ts-ignore
        dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 2 }] })
      }
    }

    // @ts-ignore
    dd.content.push({ text: this.textOnDialog.historico_amostral_landsat.title_tab, style: 'subheader', pageBreak: this.carData.length > 0 ? "before" : false })

    if (this.dadosValidacao_Amostral.exist) {
      let validacaoLandsat = {
        columns: [
          {
            style: 'tableDpat',
            layout: 'noBorders',
            table: {
              body: [
                [
                  { text: this.textOnDialog.historico_amostral_landsat.amostral_title.toUpperCase(), alignment: 'left', colSpan: 2 },
                  {},
                ],
                [
                  this.textOnDialog.information_tab.polygon_label,
                  { text: this.dadosValidacao_Amostral.finalClass, alignment: 'left', style: 'data' },
                ]
              ]
            }
          },
          [
            {
              image: await this.getBase64ImageFromUrl(this.urlsLandSat.legend),
              width: 150,
            },
            // [left, top, right, bottom]
            { text: this.textOnDialog.historico_amostral_landsat.amostral_classes_legend_label, alignment: 'center', style: 'data', margin: [0, 15, 0, 0], },
          ]
        ]
      };
      dd.content.push(validacaoLandsat)
    }

    let separar = function (base, maximo) {
      var resultado = [[]];
      var grupo = 0;

      for (var indice = 0; indice < base.length; indice++) {
        if (resultado[grupo] === undefined) {
          resultado[grupo] = [];
        }

        resultado[grupo].push(base[indice]);

        if ((indice + 1) % maximo === 0) {
          grupo = grupo + 1;
        }
      }
      return resultado;
    }

    let columnsImages = separar(this.albumLandsat, 3);

    for (let [index, images] of columnsImages.entries()) {
      let imagesLanset = [];
      for (let [index, image] of images.entries()) {
        imagesLanset.push([
          { image: await self.getBase64ImageFromUrl(image.thumb), width: 170, alignment: 'center', margin: [2, 10, 2, 0] },
          { text: image.caption, alignment: 'center', margin: [0, 2, 0, 0] },
        ]);
      }
      dd.content.push({ columns: imagesLanset });
    }

    let canvasToBase64Modis = async function () {
      let canvas = await html2canvas(document.querySelector("#reportChart"));
      return canvas.toDataURL('image/png');
    }

    // @ts-ignore
    dd.content.push({ text: this.textOnDialog.historico_amostral_landsat.series_modis_title, style: 'subheader', margin: [0, 10, 0, 0] })
    // @ts-ignore
    dd.content.push({ image: await canvasToBase64Modis(), width: 520, alignment: 'center', margin: [2, 10, 2, 0] })

    if (this.dataCampo.length > 0) {
      // @ts-ignore
      dd.content.push({ text: this.textOnDialog.campo_tab.title_tab, style: 'subheader', pageBreak: this.albumLandsat.length > 0 ? "before" : false })

      let usocobertura = [];
      let obs = [];

      if (this.infoVisita.usocobertura != ' ') {
        usocobertura.push(this.textOnDialog.campo_tab.field_uso_do_solo_label, this.infoVisita.usocobertura);
      } else {
        usocobertura.push({}, {});
      }

      if (this.infoVisita.obs != ' ') {
        obs.push(this.textOnDialog.campo_tab.field_observation_label, this.infoVisita.obs);
      } else {
        obs.push({}, {});
      }
      let table = {
        style: 'tableDpat',
        layout: 'noBorders',
        table: {
          body: [
            [
              { text: this.textOnDialog.campo_tab.field_data_label.toUpperCase(), alignment: 'left', colSpan: 2 },
              {},
            ],
            [
              this.textOnDialog.campo_tab.field_number_label,
              { text: this.infoVisita.campo, alignment: 'left', style: 'data' },
            ],
            [
              this.textOnDialog.campo_tab.field_visit_date_label,
              { text: this.infoVisita.dataFormatada, alignment: 'left', style: 'data' },
            ],
            [
              this.textOnDialog.information_tab.latitude_label,
              { text: this.infoVisita.latitude, alignment: 'left', style: 'data' },
            ],
            [
              this.textOnDialog.information_tab.longitude_label,
              { text: this.infoVisita.longitude, alignment: 'left', style: 'data' },
            ],
            usocobertura,
            obs
          ]
        }
      };

      // @ts-ignore
      dd.content.push(table);

      if (this.galleryDrones.length > 0) {
        for (const [index, item] of this.galleryDrones.entries()) {
          if (index < 4) {
            // @ts-ignore
            dd.content.push({ image: await self.getBase64ImageFromUrl(item.medium), width: 400, alignment: 'center', margin: [2, 10, 2, 10] });
            // [left, top, right, bottom]
            // @ts-ignore
            // dd.content.push({text:this.textOnDialog.campo_tab.title_drone_photo_tab + ' 0' + index+1, alignment: 'center'});
          }
        }
      } else {
        for (const [index, item] of this.galleryCamera.entries()) {
          if (index < 4) {
            // @ts-ignore
            dd.content.push({ image: await self.getBase64ImageFromUrl(item.medium), width: 400, alignment: 'center', margin: [2, 5, 2, 5] });
            // @ts-ignore
            // dd.content.push({text:this.textOnDialog.campo_tab.title_camera_tab + ' ' + index, alignment: 'center',});
          }
        }
      }

    }

    if (this.dataSuscept.prob_suscept != null || (this.dataBfast.pct_bfast != null && this.dataBfast.pct_bfast)) {
      let columns = [];
      // @ts-ignore
      dd.content.push({ text: this.textOnDialog.analise_automatica.title_tab, style: 'subheader', pageBreak: this.albumLandsat.length > 0 ? "before" : false })
      let legend = [];

      if (this.dataSuscept.legend) {
        legend.push(
          {
            image: await self.getBase64ImageFromUrl(self.dataSuscept.legend),
            width: 100,
            margin: 5,
            alignment: 'left'
          },
        );
      }

      legend.push({ text: this.textOnDialog.analise_automatica.info_susceptibility_faixas, alignment: 'justify', style: 'data', margin: [0, 10, 15, 0] });

      if (this.dataSuscept.prob_suscept != null) {
        legend.push(
          {
            text: this.textOnDialog.analise_automatica.info_susceptibility_description_split[0] +
              this.dataSuscept.type +
              this.textOnDialog.analise_automatica.info_susceptibility_description_split[1] +
              this.dataSuscept.sucept_desmatFormatada + '.',
            alignment: 'justify',
            margin: [0, 10, 15, 0],
            style: 'data'
          }
        );
      }

      columns.push(
        legend,
        {
          image: await self.getBase64ImageFromUrl(self.vetSuscept[0].thumb),
          width: 300,
          margin: 5,
          alignment: 'center'
        }
      );

      dd.content.push({ columns: columns })
    };

    if (this.dataBfast.pct_bfast != null && this.dataBfast.pct_bfast > 0) {
      let columns = [];
      // @ts-ignore
      dd.content.push({ text: this.textOnDialog.analise_automatica.title_info_bfast, style: 'subheader' })
      let legend = [];

      if (this.dataBfast.legend) {
        legend.push(
          {
            image: await self.getBase64ImageFromUrl(self.dataBfast.legend),
            width: 100,
            margin: 5,
            alignment: 'left'
          },
        );
      }

      legend.push({ text: this.textOnDialog.analise_automatica.info_bfast_faixas, alignment: 'justify', style: 'data', margin: [0, 10, 15, 0], });
      legend.push(
        {
          text: this.textOnDialog.analise_automatica.info_bfast_description +
            this.dataBfast.prob_Formatada,
          alignment: 'justify',
          margin: [0, 10, 15, 0],
          style: 'data'
        }
      );

      columns.push(
        legend,
        {
          image: await self.getBase64ImageFromUrl(self.vetBfast[0].thumb),
          width: 300,
          margin: 5,
          alignment: 'center'
        }
      );

      dd.content.push({ columns: columns })
    };

    if (this.abcData.length > 0) {
      // @ts-ignore
      dd.content.push({ text: this.textOnDialog.fip_abc_tab.title_tab, style: 'subheader', pageBreak: "before" })

      for (const [index, item] of this.abcData.entries()) {
        let columns = [];

        let area_tecnologia = [];
        let tec_impl = [];

        if (item.metaData.area_tecnologia > 0) {
          area_tecnologia.push(this.textOnDialog.fip_abc_tab.property_area_tec_label);
          area_tecnologia.push({ text: self.decimalPipe.transform(item.metaData.area_tecnologia, '1.2-3') + '  km²', alignment: 'left', style: 'data' });
        } else {
          area_tecnologia.push({}, {});
        }

        if (item.metaData.tec_impl != null) {
          tec_impl.push(this.textOnDialog.fip_abc_tab.property_applied_tec_label);
          tec_impl.push({ text: item.metaData.tec_impl, alignment: 'left', style: 'data' });
          tec_impl.push(this.textOnDialog.fip_abc_tab.property_area_deforested_label);
          tec_impl.push({ text: self.decimalPipe.transform(item.metaData.area_desmatada, '1.2-3') + '  km²', alignment: 'left', style: 'data' });
        } else {
          tec_impl.push({}, {}, {}, {});
        }
        let legend = [];

        if (item.imgsProp.legendProp) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsProp.legendProp),
              fit: [150, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsProp.legendExp) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsProp.legendExp),
              fit: [150, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsProp.legendTec) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsProp.legendTec),
              fit: [150, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsProp.legendDesmatamento) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsProp.legendDesmatamento),
              fit: [150, 20],
              alignment: 'left'
            }
          );
        }

        let table = {
          style: 'tableDpat', layout: 'noBorders', widths: [150], table: {
            body: [
              [
                { text: this.textOnDialog.fip_abc_tab.title_info.toUpperCase(), alignment: 'left', style: 'data', margin: [0, 10, 0, 10] },
              ],
              [
                this.textOnDialog.fip_abc_tab.property_area_label
              ],
              [
                { text: self.decimalPipe.transform(item.metaData.area_propriedade, '1.2-3') + '  km²', alignment: 'left', style: 'data' },
              ],
              [
                this.textOnDialog.fip_abc_tab.property_area_explored_label
              ],
              [
                { text: self.decimalPipe.transform(item.metaData.area_explorada, '1.2-3') + '  km²', alignment: 'left', style: 'data' },
              ],
              [
                area_tecnologia[0],
              ],
              [
                area_tecnologia[1],
              ],
              [
                tec_impl[0],
              ],
              [
                tec_impl[1]
              ],
              [
                tec_impl[2]
              ],
              [
                tec_impl[3]
              ]
            ]
          }
        };
        columns.push(
          table,
          {
            image: await self.getBase64ImageFromUrl(this.vetABC[index].thumb),
            width: 150,
            margin: 5,
            alignment: 'center'
          },
          legend
        );
        dd.content.push({ columns: columns })
        // @ts-ignore
        dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 2 }] })
      }
    }

    let dados = {
      token: new Date().getTime(),
      params: this.data
    }
    this.http.post('/service/report/store', JSON.stringify(dados, null, 2), this.httpOptions).subscribe(result => {
      if (Array.isArray(result)) {
        // @ts-ignore
        dd.content.push({ text: this.textOnDialog.information_tab.info_qrcode, alignment: 'center', style: 'textFooter', margin: [190, 80, 190, 10], pageBreak: false });
        // @ts-ignore
        dd.content.push({ qr: 'https://www.cerradodpat.org/#/plataforma/' + result[0].token, fit: '150', alignment: 'center' });
        // @ts-ignore
        dd.content.push({ text: 'https://www.cerradodpat.org/#/plataforma/' + result[0].token, alignment: 'center', style: 'textFooter' });
        let filename = this.textOnDialog.title.toLowerCase() + ' - ' + result[0].token + '.pdf'
        pdfMake.createPdf(dd).download(filename);
      }
    }, (err) => {
      console.error('Não foi possível cadastrar cadastrar a requisição do relatório')
      this.loading = false;
    });
    this.loading = false;
  }

  ngOnInit() {
    let fieldPhotosUrl = '/service/report/field/' + this.getServiceParams();

    this.http.get(fieldPhotosUrl).subscribe(
      result => {

        this.infoDesmat = result['info'];

        if (this.infoDesmat.classefip == null) {
          this.infoDesmat.pathclassefip = '1';
        } else {
          this.infoDesmat.pathclassefip = '/assets/metric/classe' + this.infoDesmat.classefip + '_' + this.data.language + '.png'
        }

        this.carData = result['car'];
        this.carData.show = result['car'].show;

        this.carData.forEach(element => {

          element.metaData.dataRefFormatada = element.metaData.dataRef == '' ? this.textOnDialog.car_tab.undisclosed_message_car : this.data.datePipe.transform(new Date(element.metaData.dataRef), 'dd/MM/yyyy');
          // element.metaData.area_car = element.metaData.area_car / 100.0  //converte HA to Km2
          element.metaData.percentDesmat = '' + (((element.metaData.area_desmatada / element.metaData.area_car) * 100).toFixed(2) + '%').replace('.', ',');
          element.metaData.percentRL = '' + (((element.metaData.area_desmat_rl / element.metaData.area_reserva_legal_total) * 100).toFixed(2) + '%').replace('.', ',');
          element.metaData.percentAPP = '' + (((element.metaData.area_desmat_app / element.metaData.area_app_total) * 100).toFixed(2) + '%').replace('.', ',');

          this.textOnDialog.car_tab.display_rl_message = this.textOnDialog.car_tab.rl_car_label.split('?');
          this.textOnDialog.car_tab.display_app_message = this.textOnDialog.car_tab.app_car_label.split('?');
          this.textOnDialog.car_tab.display_car_description_message = this.textOnDialog.car_tab.deforestation_car_description.split('?');
          // this.textOnDialog.car_tab.display_rl_message = temp[0] + element.metaData.area_desmat_rl + temp[1] + element.metaData.percentRL + temp[2]

          let dcar = {
            src: element.imgsCar.src,
            caption: 'CAR: ' + element.metaData.cod_car,
            thumb: element.imgsCar.thumb
          };
          this.vetCar.push(dcar);

        });


        this.abcData = result['ABC'];

        this.abcData.forEach(element => {

          let dcar = {
            src: element.imgsProp.src,
            caption: 'ID: ' + element.metaData.chaveID,
            thumb: element.imgsProp.thumb
          };
          this.vetABC.push(dcar);

          if (element.metaData.tec_impl != '') {

            for (const m of this.data.mapForABC) {
              if (m[0] === element.metaData.tec_impl) {
                if (this.data.language === 'pt-br') {
                  element.metaData.tec_impl = m[1]['pt-br'];
                }
                else {
                  element.metaData.tec_impl = m[1]['en-us'];
                }
              }
            }
          }

          if (element.metaData.producao != '') {

            for (const m of this.data.mapForProducao) {
              if (m[0] === element.metaData.producao) {
                if (this.data.language === 'pt-br') {
                  element.metaData.producao = m[1]['pt-br'];
                }
                else {
                  element.metaData.producao = m[1]['en-us'];
                }
              }
            }
          }

        });

        this.dataEspecial = result['especial'];

        if (this.dataEspecial == null || this.dataEspecial == undefined) {
          this.dataEspecial = null
        } else {
          let msg = this.textOnDialog.especial_area.meiodistancia.split("?")

          if (this.dataEspecial.ti.show) {
            this.vetEspecial.push({
              id: 'ti',
              src: this.dataEspecial.ti.src,
              thumb: this.dataEspecial.ti.thumb,
              caption: this.dataEspecial.ti.ti_nom + ", " + msg[0] + " " + this.dataEspecial.ti.ti_dist + msg[1]
            });
          }

          if (this.dataEspecial.ucus.show) {

            this.vetEspecial.push({
              id: 'ucus',
              src: this.dataEspecial.ucus.src,
              thumb: this.dataEspecial.ucus.thumb,
              caption: this.dataEspecial.ucus.ucus_nom + ", " + msg[0] + " " + this.dataEspecial.ucus.ucus_dist + msg[1]
            });
          }

          if (this.dataEspecial.ucpi.show) {
            this.vetEspecial.push({
              id: 'ucpi',
              src: this.dataEspecial.ucpi.src,
              thumb: this.dataEspecial.ucpi.thumb,
              caption: this.dataEspecial.ucpi.ucpi_nom + ", " + msg[0] + " " + this.dataEspecial.ucpi.ucpi_dist + msg[1]
            });
          }

          if (this.dataEspecial.q.show) {
            this.vetEspecial.push({
              id: 'q',
              src: this.dataEspecial.q.src,
              thumb: this.dataEspecial.q.thumb,
              caption: this.dataEspecial.q.q_nom + ", " + msg[0] + " " + this.dataEspecial.q.q_dist + msg[1]
            });
          }

          // if (this.dataEspecial.ap.show) {
          // this.vetEspecial.push({
          //   src: this.dataEspecial.ap.src,
          //   thumb: this.dataEspecial.ap.thumb,
          //   caption: this.dataEspecial.ap.ap_nom + ", " + msg[0] + " " + this.dataEspecial.ap.ap_dist + msg[1]
          // });
          // }


        }


        let sent = {
          src: result['images'].urlSentinel.src,
          caption: 'Landsat ' + this.data.year,
          thumb: result['images'].urlSentinel.thumb
        };
        this.urlSentinel.push(sent);

        this.dataCampo = result['ponto_campo'];

        this.urlsLandSat = result['images'].urlsLandSat;

        for (let i = 0; i < this.urlsLandSat.urlsLandsatMontadas.length; i++) {
          let album = {
            src: this.urlsLandSat.urlsLandsatMontadas[i].url,
            caption: this.textOnDialog.historico_amostral_landsat.caption + this.urlsLandSat.urlsLandsatMontadas[i].year,
            thumb: this.urlsLandSat.urlsLandsatMontadas[i].thumb
          };

          this.albumLandsat.push(album);
        }

        this.dadosValidacao_Amostral = result['images'].urlsLandSat.dadosAmostrais;

        this.dataBfast = result['images'].urlBfast;
        this.dataBfast.prob_Formatada = this.dataBfast.pct_bfast == null ? this.textOnDialog.analise_automatica.not_computed : ('' + this.dataBfast.pct_bfast.toFixed(2) + '%').replace('.', ',');

        let dfast = {
          src: this.dataBfast.urlBfast.src,
          caption: this.dataBfast.prob_Formatada + this.textOnDialog.analise_automatica.caption_bfast,
          thumb: this.dataBfast.urlBfast.thumb
        };
        this.vetBfast.push(dfast);

        this.dataSuscept = result['images'].suscept;

        this.textOnDialog.analise_automatica.info_susceptibility_description_split = this.textOnDialog.analise_automatica.info_susceptibility_description.split('?');
        this.dataSuscept.sucept_desmatFormatada = this.dataSuscept.prob_suscept == null ? this.textOnDialog.analise_automatica.not_computed : ('' + (this.dataSuscept.prob_suscept * 100).toFixed(2) + '%').replace('.', ',');
        let dsuscept = {
          src: this.dataSuscept.urlSuscept.src,
          caption: this.textOnDialog.analise_automatica.caption_suscept + this.dataSuscept.sucept_desmatFormatada,
          thumb: this.dataSuscept.urlSuscept.thumb
        };
        this.vetSuscept.push(dsuscept);

        // console.log(this.dataSuscept, this.dataBfast)
      },
      err => {
        console.log('Error: ', err);
      },
      () => {
        // <---- chamada ao finalizar o subscribe.
        this.galleryOptions = [
          {
            width: '100%',
            height: '500px',
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
            width: '100%',
            height: '700px',
            imagePercent: 100,
            thumbnailsPercent: 20,
            thumbnailsMargin: 20,
            thumbnailMargin: 20
          },
          {
            breakpoint: 400,
            preview: false
          }
        ];

        for (let index = 0; index < this.dataCampo.length; index++) {
          let element = this.dataCampo[index];

          this.infoVisita = element;

          this.infoVisita.dataFormatada = this.infoVisita.data_visita == '' ? this.textOnDialog.campo_tab.caption_undisclosed : this.infoVisita.data_visita;


          for (let foto = 0; foto < element.fotos_camera.length; foto++) {
            this.galleryCamera.push({
              small: '/service/report/field/fotos_camera/' + element.campo_id + '/' + element.fotos_camera[foto],
              medium: '/service/report/field/fotos_camera/' + element.campo_id + '/' + element.fotos_camera[foto],
              big: '/service/report/field/fotos_camera/' + element.campo_id + '/' + element.fotos_camera[foto],
            });
          }


          for (let foto = 0; foto < element.fotos_drone.length; foto++) {
            this.galleryDrones.push({
              small: '/service/report/field/fotos_drone/' + element.campo_id + '/' + element.fotos_drone[foto],
              medium: '/service/report/field/fotos_drone/' + element.campo_id + '/' + element.fotos_drone[foto],
              big: '/service/report/field/fotos_drone/' + element.campo_id + '/' + element.fotos_drone[foto]
            });
          }

          for (let video = 0; video < element.videos_drone.length; video++) {
            this.galleryVideos.push({
              small: '/service/report/field/videos_drone/' + element.campo_id + '/' + element.videos_drone[video],
              medium: '/service/report/field/videos_drone/' + element.campo_id + '/' + element.videos_drone[video],
              big: '/service/report/field/videos_drone/' + element.campo_id + '/' + element.videos_drone[video]
            });
          }
        }
      }
    );


    //  @todo REMOVE
    let ndvi_time_series = '/service/deforestation/modis?table=' + this.data.origin_table + '&gid=' + this.data.gid;
    this.http.get(ndvi_time_series).subscribe(
      result => {
        this.tmpModis = result;
      },
      err => {
        console.log('Error: ', err);
      },
      () => {

        this.dataTimeseriesModis = {
          labels: this.tmpModis.map(element => element.date),
          datasets: [
            {
              label: 'NDVI',
              data: this.tmpModis.map(element => element.ndvi_golay.toFixed(4)),
              fill: false,
              borderColor: '#0007db',
              backgroundColor: '#0007db',
              hidden: false,
              pointRadius: 1,
              pointHoverRadius: 3,
              pointStyle: 'rect'
            }
          ],
          type: 'line'

        };

        // graphic.options.legend.onHover = function (event) {
        //   event.target.style.cursor = 'pointer';
        //   graphic.options.legend.labels.fontColor = "#0335fc";
        // }

        // graphic.options.legend.onLeave = function (event) {

        //   event.target.style.cursor = 'default';
        //   graphic.options.legend.labels.fontColor = "#fa1d00";
        // }

        this.optionsTimeSeries = {
          tooltips: {
            mode: 'index',
            intersect: true,
          },
          maintainAspectRatio: false,
          resposive: true,
          radius: 1,
          scales: {
            yAxes: [{
              ticks: {
                autoSkip: true,
                stepSize: 0.2
              }
            }],
            xAxes: [{
              type: 'time',
              ticks: {
                autoSkip: true
              }
            }]
          },
          title: {
            display: false,
            fontSize: 16
          },
          legend: {
            labels: {
              usePointStyle: true,
              fontSize: 14
            },
            onHover(event) {
              event.target.style.cursor = 'pointer';
            },
            onLeave(event) {
              event.target.style.cursor = 'default';
            },
            position: 'bottom'
          }
        };



      }
    );

    let register_event = this.data.origin_table + "_" + this.data.gid
    this.googleAnalyticsService.eventEmitter("polygonReport", "Deforestation_Report", register_event, 9);
  }

  ngOnDestroy() {
    this.cdRef.detach();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.cdRef.detectChanges();
  }

  openImage(index: number): void {
    this._lightbox.open(this.albumLandsat, index);
  }

  closeImage(): void {
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

  openLightboxABC(index: number): void {
    this._lightbox.open(this.vetABC, index);
  }

  openLightboxEspecial(index: string): void {

    let pos = 0;
    for (let i = 0; i < this.vetEspecial.length; i++) {
      if (this.vetEspecial[i].id.toUpperCase() == index.toUpperCase()) {
        pos = i;
      }
    }

    this._lightbox.open(this.vetEspecial, pos);
  }


}