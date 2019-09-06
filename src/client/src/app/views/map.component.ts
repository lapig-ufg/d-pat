import { Component, Inject, Injectable, OnInit, LOCALE_ID } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatDialogConfig} from '@angular/material';

import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';

import BingMaps from 'ol/source/BingMaps';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import OlView from 'ol/View';
import * as OlProj from 'ol/proj';
import TileGrid from 'ol/tilegrid/TileGrid';
import * as OlExtent from 'ol/extent.js';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import Style from 'ol/style/Style';
import Stroke from 'ol/style/Stroke';
import VectorSource from 'ol/source/Vector';
import Circle from 'ol/style/Circle.js';
import Select from 'ol/interaction/Select';
import UTFGrid from 'ol/source/UTFGrid.js';
import * as _ol_TileUrlFunction_ from 'ol/tileurlfunction.js';
import Overlay from 'ol/Overlay.js';
import Fill from 'ol/style/Fill.js';
import * as Condition from 'ol/events/condition.js';


const SEARCH_URL = 'service/map/search';
const PARAMS = new HttpParams({
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

		return this.http.get(SEARCH_URL, { params: PARAMS.set('key', term) }).pipe(
			map(response => response)
		);
	}
}


@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	providers: [SearchService],
	styleUrls: [
		'./map.component.css'
	]
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
	chartResultCities: [];
	periodSelected: any;
	desmatInfo: any

	optionsTimeSeries: any;
	optionsStates: any;
	optionsCities: any;

	changeTabSelected: '';
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

	searching = false;
	searchFailed = false;
	msFilterRegion = '';
	selectRegion: any;


	regionSelected: 'Brasil';
	regionTypeBr: any;
	region_geom: any;
	regionSource: any;
	regionTypeFilter: any;

	defaultRegion: any;


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
	infoOverlay: Overlay;
	datePipe: DatePipe

	constructor(private http: HttpClient, private _service: SearchService, public dialog: MatDialog) {

		this.projection = OlProj.get('EPSG:900913');
		this.currentZoom = 5.8;
		this.layers = [];

		this.defaultRegion = {
			type: 'biome',
			text: 'Cerrado',
			value: 'Cerrado'
		}
		this.selectRegion = this.defaultRegion;

		this.urls = [
			'http://o1.lapig.iesa.ufg.br/ows',
			'http://o2.lapig.iesa.ufg.br/ows',
			'http://o3.lapig.iesa.ufg.br/ows',
			'http://o4.lapig.iesa.ufg.br/ows'
			// 'http://localhost:5001/ows'
		];

		this.tileGrid = new TileGrid({
			extent: this.projection.getExtent(),
			resolutions: this.getResolutions(this.projection),
			tileSize: 512
		});

		this.descriptor = {
			"groups": []
		}

		this.periodSelected = {
			value: "year=2018",
			Viewvalue: '2017/2018',
			year: 2018
		}

		this.desmatInfo = {
			value: "year=2018",
			Viewvalue: '2017/2018',
			year: 2018
		};

		this.datePipe = new DatePipe('pt-BR');

		this.infodata = { showUTFGridCard : true }

		this.updateCharts();
		this.chartRegionScale = true;
	}

	search = (text$: Observable<string>) =>
		text$.pipe(
			debounceTime(300),
			distinctUntilChanged(),
			tap(() => this.searching = true),
			switchMap(term =>
				this._service.search(term).pipe(
					tap(() => this.searchFailed = false),
					catchError(() => {
						this.searchFailed = true;
						return of([]);
					}))
			),
			tap(() => this.searching = false)
		)

	formatter = (x: { text: string }) => x.text;



	private selectedTimeFromLayerType(layerName) {
		for (let layer of this.layersTypes) {
			if (layer.value == layerName) {
				for (let time of layer.times) {
					if (time.value == layer.timeSelected) {
						return time
					}
				}
			}
		}

		return undefined
	}

	openDialog(): void {
		const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
		  width: '250px',
		  data: 'Teste'
		});
	
		dialogRef.afterClosed().subscribe(result => {
		  console.log('The dialog was closed');
		});
	  }
	
	private getServiceParams() {

		var params = []

		if (this.selectRegion.type != '') {
			params.push("type=" + this.selectRegion.type)
			params.push("region=" + this.selectRegion.value)
		}

		var selectedTime = this.selectedTimeFromLayerType('bi_ce_prodes_desmatamento_100_fip')

		if (selectedTime != undefined) {
			params.push("year=" + selectedTime.year)
		}

		var urlParams = "?" + params.join("&")

		return urlParams

	}

	private updateExtent() {
		var extenUrl = '/service/map/extent' + this.getServiceParams()

		if (this.selectRegion.type != '') {
			var map = this.map;
			this.http.get(extenUrl).subscribe(extentResult => {
				var features = (new GeoJSON()).readFeatures(extentResult, {
					dataProjection: 'EPSG:4326',
					featureProjection: 'EPSG:3857'
				});

				this.regionSource = this.regionsLimits.getSource();
				this.regionSource.clear()
				this.regionSource.addFeature(features[0])

				var extent = features[0].getGeometry().getExtent();
				map.getView().fit(extent, { duration: 1500 });
			})
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
		var timeseriesUrl = '/service/deforestation/timeseries' + this.getServiceParams();
		var statesUrl = '/service/deforestation/states' + this.getServiceParams();
		var citiesUrl = '/service/deforestation/cities' + this.getServiceParams();

		this.http.get(timeseriesUrl).subscribe(timeseriesResult => {
			this.dataSeries = {
				labels: timeseriesResult['series'].map(element => element.year),
				datasets: [
					{
						label: timeseriesResult['name'],
						data: timeseriesResult['series'].map(element => element.value),
						fill: false,
						borderColor: '#289628'
					}
				]
			}
			this.optionsTimeSeries = {
				tooltips: {
					callbacks: {
						label: function (tooltipItem, data) {
							var percent = parseFloat(data['datasets'][0]['data'][tooltipItem['index']]).toLocaleString('de-DE');
							return percent + ' km²';
						}

					}
				},
				scales: {
					yAxes: [{
						ticks: {
							callback: function (value) {
								return value.toLocaleString('de-DE') + ' km²';
							}
						}
					}]
				},
				title: {
					display: false,
					text: 'Testing Title',
					fontSize: 16
				},
				legend:
				{
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
							label: 'Estados',
							data: statesResult['series'].map(element => element.value),
							fill: true,
							// borderColor: '#333333',
							backgroundColor: '#fd7e14'
						}
					]
				}

				this.optionsStates = {
					tooltips: {
						callbacks: {
							label: function (tooltipItem, data) {
								var percent = (parseFloat(data['datasets'][0]['data'][tooltipItem['index']]).toLocaleString('de-DE'));
								return percent + ' km²';
							}

						}
					},
					scales: {
						xAxes: [{
							ticks: {
								callback: function (value) {
									return value.toLocaleString('de-DE') + ' km²';
								}
							}
						}]
					},
					legend:
					{
						position: 'bottom'
					}
				}
			});
		}

		if (!this.isFilteredByCity) {
			this.http.get(citiesUrl).subscribe(citiesResult => {
				this.chartResultCities = citiesResult['rows'];
			});
		}
	}

	updateRegion(region) {
		if (region == this.defaultRegion) {
			this.valueRegion = ''
			this.desmatInfo = {
				value: "year=2018",
				Viewvalue: '2017/2018',
				year: 2018
			};
		}

		this.selectRegion = region;

		this.isFilteredByCity = false;
		this.isFilteredByState = false;

		if (this.selectRegion.type == 'city') {
			this.msFilterRegion = " county = '" + this.selectRegion.value + "'"
			this.isFilteredByCity = true;
			this.isFilteredByState = true;
		}
		else if (this.selectRegion.type == 'state') {
			this.msFilterRegion = "uf = '" + this.selectRegion.value + "'"
			this.isFilteredByState = true;
		}
		else
			this.msFilterRegion = ""


		this.updateExtent()
		this.updateSourceAllLayer()

	}

	private getResolutions(projection) {
		var projExtent = projection.getExtent();
		var startResolution = OlExtent.getWidth(projExtent) / 256;
		var resolutions = new Array(22);
		for (var i = 0, ii = resolutions.length; i < ii; ++i) {
			resolutions[i] = startResolution / Math.pow(2, i);
		}
		return resolutions
	}

	private createMap() {
		this.createBaseLayers();
		this.createLayers();
		this.map = new OlMap({
			target: 'map',
			layers: this.layers,
			view: new OlView({
				center: OlProj.fromLonLat([-52, -14]),
				projection: this.projection,
				zoom: this.currentZoom,
			}),
			loadTilesWhileAnimating: true,
			loadTilesWhileInteracting: true
		});

		var style = new Style({
			image: new Circle({
				radius: 7,
				fill: new Fill({ color: '#b8714e', width: 1 }),
				stroke: new Stroke({ color: '#7b2900', width: 2 })
			})
		})

		var selectOver = new Select({
			condition: Condition.pointerMove,
			layers: [this.fieldPointsStop],
			style: style
		});

		var select = new Select({
			condition: Condition.click,
			layers: [this.fieldPointsStop],
			style: style
		});

		this.map.addInteraction(select);
		this.map.addInteraction(selectOver);

		this.infoOverlay = new Overlay({
			element: document.getElementById('map-info'),
			offset: [15, 15],
			stopEvent: false
		});

		this.map.addOverlay(this.infoOverlay);

		this.map.on('pointermove', function (evt) {
			if (evt.dragging) {
				return;
			}

			var coordinate = this.map.getEventCoordinate(evt.originalEvent);
			var viewResolution = this.map.getView().getResolution();

			this.utfgridsource.forDataAtCoordinateAndResolution(coordinate, viewResolution,
				function (data) {
					if (data) {
						if(this.layersNames.find(element => element.selectedType === 'bi_ce_prodes_desmatamento_100_fip').visible)
						{
							if(data.origin_table =='prodes')
							{
								this.infodata = data;
								this.infodata.dataFormatada = (this.infodata.data_detec == '' ? 'Não Divulgada' : this.datePipe.transform(new Date(this.infodata.data_detec), 'dd/MM/yyyy'))
								this.infodata.sucept_desmatFormatada = (this.infodata.sucept_desmat == '' ? 'Não Computada' : (''+(this.infodata.sucept_desmat*100).toFixed(2) + '%').replace('.', ','))
								this.infodata.origin_table = this.infodata.origin_table.toUpperCase();
								this.infodata.showUTFGridCard = true;
							}
						}
						if(this.layersNames.find(element => element.selectedType === 'bi_ce_deter_desmatamento_100_fip').visible){
							if(data.origin_table == 'deter')
							{
								this.infodata = data;
								this.infodata.dataFormatada = (this.infodata.data_detec == '' ? 'Não Divulgada' : this.datePipe.transform(new Date(this.infodata.data_detec), 'dd/MM/yyyy'))
								this.infodata.sucept_desmatFormatada = (this.infodata.sucept_desmat == '' ? 'Não Computada' : (''+(this.infodata.sucept_desmat*100).toFixed(2) + '%').replace('.', ','))
								this.infodata.origin_table = this.infodata.origin_table.toUpperCase();
								this.infodata.showUTFGridCard = true;
							}
						}

						this.infoOverlay.setPosition(data ? coordinate : undefined);
					} else {
						this.infodata.showUTFGridCard = false ;
					}
				}.bind(this));
		}.bind(this));

	}


	private createBaseLayers() {
		this.mapbox = {
			visible: true,
			layer: new OlTileLayer({
				source: new OlXYZ({
					wrapX: false,
					url: 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
				}),
				visible: true
			})
		}

		this.satelite = {
			visible: false,
			layer: new OlTileLayer({
				preload: Infinity,
				source: new BingMaps({
					key: 'VmCqTus7G3OxlDECYJ7O~G3Wj1uu3KG6y-zycuPHKrg~AhbMxjZ7yyYZ78AjwOVIV-5dcP5ou20yZSEVeXxqR2fTED91m_g4zpCobegW4NPY',
					imagerySet: 'Aerial'
				}),
				visible: false
			})
		}

		this.estradas = {
			visible: false,
			layer: new OlTileLayer({
				preload: Infinity,
				source: new BingMaps({
					key: 'VmCqTus7G3OxlDECYJ7O~G3Wj1uu3KG6y-zycuPHKrg~AhbMxjZ7yyYZ78AjwOVIV-5dcP5ou20yZSEVeXxqR2fTED91m_g4zpCobegW4NPY',
					imagerySet: 'Road'
				}),
				visible: false
			})
		}

		this.relevo = {
			visible: false,
			layer: new OlTileLayer({
				source: new OlXYZ({
					url: 'https://server.arcgisonline.com/ArcGIS/rest/services/' +
						'World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}'
				}),
				visible: false,
			})
		}

		this.landsat = {
			visible: false,
			layer: new OlTileLayer({
				source: new TileWMS({
					url: 'http://mapbiomas-staging.terras.agr.br/wms',
					projection: 'EPSG:3857',
					params: {
						'LAYERS': 'rgb',
						'SERVICE': 'WMS',
						'TILED': true,
						'VERSION': '1.1.1',
						'TRANSPARENT': 'true',
						'MAP': 'wms/v/staging/classification/rgb.map',
						'YEAR': 2017
					},
					serverType: 'mapserver',
					tileGrid: this.tileGrid
				}),
				visible: false,
			})
		}

		for (let baseName of this.basemapsNames) {
			this.layers.push(this[baseName.value].layer)
		}

	}

	private createLayers() {
		var olLayers: OlTileLayer[] = new Array();

		//layers
		for (let layer of this.layersTypes) {
			this.LayersTMS[layer.value] = this.createTMSLayer(layer);
			this.layers.push(this.LayersTMS[layer.value])
		}

		//limits
		for (let limits of this.limitsNames) {
			this.limitsTMS[limits.value] = this.createTMSLayer(limits)
			this.layers.push(this.limitsTMS[limits.value])
		}

		this.regionsLimits = this.createVectorLayer('regions', '#ffea00', 1);
		this.layers.push(this.regionsLimits);

		this.utfgridsource = new UTFGrid({
			tileJSON: this.getTileJSON()
		});

		var utfgridLayer = new OlTileLayer({
			source: this.utfgridsource
		});

		this.layers.push(utfgridLayer)

		this.layers.push()
		this.layers = this.layers.concat(olLayers.reverse());

	}

	private getTileJSON() {
		let text = "";
		
		text = "(origin_table = 'prodes' AND view_date>='" + this.selectedTimeFromLayerType('bi_ce_prodes_desmatamento_100_fip').year + "-01-01'" + 
		"AND view_date<'" + (this.selectedTimeFromLayerType('bi_ce_prodes_desmatamento_100_fip').year + 1) + "-01-01')" + " OR " +
		"(origin_table = 'deter' AND " + this.selectedTimeFromLayerType('bi_ce_deter_desmatamento_100_fip').value + ")";

		console.log("Text - ", text)
		return {
			version: "2.2.0",
			grids: ["/service/deforestation/info?layername=bi_ce_info_utfgrid_fip&msfilter="+ text +"&tile={x}+{y}+{z}"]
		}
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
						width: width
					})
				}),
			]
		});
	}

	private parseUrls(layer) {
		var result = []

		var filters = []

		if (layer.timeHandler == 'msfilter' && layer.times)
			filters.push(layer.timeSelected)
		if (layer.layerfilter)
			filters.push(layer.layerfilter)
		if (this.regionFilterDefault)
			filters.push(this.regionFilterDefault)
		if (layer.regionFilter && this.msFilterRegion)
			filters.push(this.msFilterRegion)

		var msfilter = '&MSFILTER=' + filters.join(' AND ')

		var layername = layer.value
		if (layer.timeHandler == 'layername')
			layername = layer.timeSelected

		for (let url of this.urls) {
			result.push(url
				+ "?layers=" + layername
				+ msfilter
				+ "&mode=tile&tile={x}+{y}+{z}"
				+ "&tilemode=gmap"
				+ "&map.imagetype=png"
			);
		}
		return result;
	}




	private updateSourceAllLayer() {
		for (let layer of this.layersTypes) {
			this.updateSourceLayer(layer)
		}
	}

	private updateSourceLayer(layer) {
		if (layer['times']) {
			this.periodSelected = layer['times'].find(element => element.value === layer.timeSelected);

		}

		if (layer['value'].search("bi_ce_prodes_desmatamento_100_fip") != -1) {
			this.desmatInfo = this.periodSelected
			this.updateCharts();
		}

		if (this.utfgridsource) {
			var tileJSON = this.getTileJSON();

			this.utfgridsource.tileUrlFunction_ = _ol_TileUrlFunction_.createFromTemplates(tileJSON.grids, this.utfgridsource.tileGrid);
			this.utfgridsource.tileJSON = tileJSON;
			this.utfgridsource.refresh();
		}

		var source_layers = this.LayersTMS[layer.value].getSource();
		source_layers.setUrls(this.parseUrls(layer))
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

	changeVisibility(layer, e) {

		for (let layerType of layer.types) {
			this.LayersTMS[layerType.value].setVisible(false)
		}

		if (e != undefined) {
			layer.visible = e.checked
		}

		this.LayersTMS[layer.selectedType].setVisible(layer.visible)
	}

	ngOnInit() {

		this.http.get('service/map/descriptor').subscribe(result => {
			this.descriptor = result
			this.regionFilterDefault = this.descriptor.regionFilterDefault;

			for (let group of this.descriptor.groups) {
				for (let layer of group.layers) {
					// console.log("lyat  ", layer)
					if (layer.id != "satelite") {
						this.layersNames.push(layer)
					}

					for (let layerType of layer.types) {
						layerType.visible = false
						if (layer.selectedType == layerType.value)
							layerType.visible = layer.visible

						this.layersTypes.push(layerType)
						this.layersTypes.sort(function (e1, e2) {
							return (e2.order - e1.order)
						});
					}
				}
			}

			for (let basemap of this.descriptor.basemaps) {
				for (let types of basemap.types) {
					this.basemapsNames.push(types)
				}
			}

			for (let limits of this.descriptor.limits) {
				for (let types of limits.types) {
					this.limitsNames.push(types)
				}
			}

			this.createMap();
		});
	}

}

@Component({
	selector: 'app-map',
	templateUrl: './dialog-laudo.html',
	styleUrls: [
		'./map.component.css'
	]
  })
  export class DialogOverviewExampleDialog {
  
	constructor(
	  public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
	  @Inject(MAT_DIALOG_DATA) public data: any) {}
  
	onNoClick(): void {
	  this.dialogRef.close();
	}
  
  }
