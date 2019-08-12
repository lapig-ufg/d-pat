import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

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
import { source } from 'openlayers';



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
	periodSelected : any;

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

	collapseLayer = false;
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

	layersTypes = [];
	basemapsNames = [];
	limitsNames = [];
	year: any;
	LayersTMS = {};
	limitsTMS = {};

	constructor(private http: HttpClient, private _service: SearchService) {

		this.projection = OlProj.get('EPSG:900913');
		this.currentZoom = 5.8;
		this.layers = [];

		this.year = 2018;

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
		];

		this.tileGrid = new TileGrid({
			extent: this.projection.getExtent(),
			resolutions: this.getResolutions(this.projection),
			tileSize: 512
		});

		this.descriptor = {
			"groups": []
		}
		
		console.log("red 0 - " , this.selectRegion)
		 this.periodSelected = { 
			Viewvalue : '2017/2018'
		 };

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

	private zoomExtent() {
		var map = this.map;
		if (this.regionTypeFilter != '') {
			this.http.get('service/map/extent?region=text=' + "'" + this.region_geom + "'").subscribe(extentResult => {
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
					},

				],

			}
			this.optionsTimeSeries = {
				scales: {
					yAxes: [{
						stacked: true
					}]
				},
				title: {
					display: false,
					text: 'Testing Title',
					fontSize : 16
				},
				legend:
				{
					position: 'bottom'
				}
			};
		});

		this.http.get(statesUrl).subscribe(statesResult => {

			this.dataStates = {
				labels: statesResult['series'].map(element => element.name),
				datasets: [
					{
						label: 'Estados',
						data: statesResult['series'].map(element => element.value),
						fill: true,
						// borderColor: '#333333',
						backgroundColor: '#e28100'
					}
				]
			}

			this.optionsStates = {
				legend:
				{
					position: 'bottom'
				}
			}
		});

		this.http.get(citiesUrl).subscribe(citiesResult => {
			// console.log("ttttt--- " , typeof(citiesResult), citiesResult)

			this.chartResultCities = citiesResult['rows'];
			// console.log("5- ", this.chartResultCities)
		});
	}

	updateRegion(region) {
		if (region == this.defaultRegion)
			this.valueRegion = ''

		this.selectRegion = region;

		console.log("re-", this.selectRegion)

		if (this.selectRegion.type == 'city')
			this.msFilterRegion = " county = '" + this.selectRegion.value + "'"
		else if (this.selectRegion.type == 'state')
			this.msFilterRegion = "uf = '" + this.selectRegion.value + "'"
		else
			this.msFilterRegion = ""

		this.updateExtent()
		this.updateCharts()
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

		this.layers.push()
		this.layers = this.layers.concat(olLayers.reverse());

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
		var source_layers = this.LayersTMS[layer.value].getSource();
		source_layers.setUrls(this.parseUrls(layer))
		source_layers.refresh();

		this.periodSelected = layer['times'].find(element => element.value === layer.timeSelected);
		console.log("perio - " , this.periodSelected)

		this.updateCharts();
		console.log("source layer -> ", layer)
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

		if (e != undefined)
			layer.visible = e.checked

		this.LayersTMS[layer.selectedType].setVisible(layer.visible)

		console.log("vis ->", layer)
	}

	ngOnInit() {

		this.http.get('service/map/descriptor').subscribe(result => {
			this.descriptor = result
			this.regionFilterDefault = this.descriptor.regionFilterDefault;

			for (let group of this.descriptor.groups) {
				for (let layer of group.layers) {
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
