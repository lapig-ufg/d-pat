import { Component, Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';

import {Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';
import "rxjs/add/observable/of";


import OlMap from 'ol/map';
import OlXYZ from 'ol/source/xyz';
import Select from 'ol/interaction/select';
import Condition from 'ol/events/condition';
import OlTileLayer from 'ol/layer/tile';
import VectorLayer from 'ol/layer/vector';
import TileGrid from 'ol/tilegrid/tilegrid';
import TileWMS from 'ol/source/tilewms';
import VectorSource from 'ol/source/vector';
import Stroke from 'ol/style/stroke';
import Fill from 'ol/style/fill';
import Style from 'ol/style/style';
import OlView from 'ol/view';
import OlProj from 'ol/proj';
import OlExtent from 'ol/extent';
import TileUTFGrid from 'ol/source/tileutfgrid';
import Overlay from 'ol/overlay';
import GeoJSON from 'ol/format/geojson';
import _ol_TileUrlFunction_ from 'ol/tileurlfunction.js';

const REGION_URL = '/service/map/search';
const PARAMS = new HttpParams({
  fromObject: {
    format: 'json'
  }
});

@Injectable()
export class RegionService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http.get(REGION_URL, {params: PARAMS.set('key', term)}).pipe(
        map(response => response)
      );
  }
}

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	providers: [RegionService],
	styleUrls: [
		'./map.component.css',
		'./map.component.scss'
	]
})

export class MapComponent implements OnInit {

	map: OlMap;
	layers: Array<TileWMS>;
	projection: OlProj;
	tileGrid: TileGrid;
	utfgridsource: TileUTFGrid;
	infoFeature: any;
	infodata: any;
	currentZoom: Number;
	
	landsat: any;
	sucetibilidade: any;
	sentinel: any;
	desmatamento: any;
	antropico: any;
	regions: any;
	fieldValidation: any;

	charts: any;
	chartResult: any;
	chartType: String;

	urls: Array<String>;
	periods: any;
	selectedPeriod: any;
	selectRegion: any;
	defaultRegion: any;
	valueRegion: any;
	deforestationAll: any;

	deforestationOpts: any;
	selectedDeforestationOpt: any;

	collapseLayer: boolean;
	collapseCharts: boolean;
	closeInfo: boolean;
	sliderOptions: any;
	indicator: any;
	polValidados: any;

	constructor(private http: HttpClient, private _service: RegionService) { 
		this.infodata = { area_desmatada: -1};
		this.projection = OlProj.get('EPSG:900913');
		this.currentZoom = 5;

		this.defaultRegion = {
			type: 'biome',
			text: 'Cerrado',
			value: 'Cerrado'
		} 
		this.selectRegion = this.defaultRegion;

		this.chartType = 'bioma';

		this.charts = { 
			timeseries: {},
			state: {}
		}

		/*
		this.urls = [
    	'http://localhost:5501/ows'
    ];*/

		this.urls = [
    	'http://o1.lapig.iesa.ufg.br/ows',
    	'http://o2.lapig.iesa.ufg.br/ows',
    	'http://o3.lapig.iesa.ufg.br/ows',
    	'http://o4.lapig.iesa.ufg.br/ows'
    ];

    this.sliderOptions = {
	    floor: 0,
	    ceil: 1,
	    step: 0.1,
	    precision: 1,
	    translate: (value: number): string => {
	      return "";
	    }
	  }

		this.tileGrid = new TileGrid({
    	extent: this.projection.getExtent(),
    	resolutions: this.getResolutions(this.projection),
      tileSize: 256
    });

		this.layers = [
      new OlTileLayer({
	      source: new OlXYZ({
		      wrapX: false,
		      url: 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
		    })
	    })
    ];

    this.deforestationOpts = [
    	{ label: 'Todos os polígonos', value: 'ALL' },
    	{ label: 'Validados em campo', value: 'VALIDATED' },
    	{ label: 'Confirmados pelo BFast-Monitor', value: 'BFAST' },
    	{ label: 'Com alta suceptibilidade', value: 'SUSCEP' }
    ]
    this.selectedDeforestationOpt = this.deforestationOpts[0]

    this.closeInfo = true;

    this.infoFeature = {
  		foto: '',
  		uso: '',
  		fitoViz: '',
  		obs: ''
  	}
	}

	searching = false;
  searchFailed = false;

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

  formatter = (x: {text: string}) => x.text;

  yAxisTickFormattingFn = (val)=>{
     return val + ' km2';
	}

	updateDeforestationOpt() {
		if (this.selectedDeforestationOpt.value == 'VALIDATED') {
			
			this.fieldValidation.setVisible(true);
			this.deforestationAll.setVisible(false);
			this.desmatamento.layer = this.fieldValidation;
			
			this.selectedPeriod = this.periods[0];
			this.updatePeriod()
			this.updateRegion(this.defaultRegion)
			this.antropico.visible = false
			this.antropico.layer.setVisible(false)
			this.collapseCharts = true
			
		} else if (this.selectedDeforestationOpt.value == 'ALL') {
			this.fieldValidation.setVisible(false);
			this.deforestationAll.setVisible(true);
			this.desmatamento.layer = this.deforestationAll;
			
			var extent = this.regions.getSource().getExtent();
			this.map.getView().fit(extent, { duration: 1500 });
		}
	}

  updateRegion(region) {
  	if(region == this.defaultRegion)
  		this.valueRegion = ''

  	this.selectRegion = region;
  	this.updatePeriod()	
  }

	mosaicOpacity(event) {
		var mosaicObj = this.landsat
		if (this.sentinel.visible)
			mosaicObj = this.sentinel

		mosaicObj.layer2.setOpacity(event.value)
	}

	mosaicVisible(mosaicObj, value) {
		if (mosaicObj != this.landsat && this.landsat.visible) {
			this.landsat.layer1.setVisible(false)
			this.landsat.layer2.setVisible(false)
			this.landsat.visible = false
		} else if(mosaicObj != this.sentinel && this.sentinel.visible) {
			this.sentinel.layer1.setVisible(false)
			this.sentinel.layer2.setVisible(false)
			this.sentinel.visible = false
		}

		mosaicObj.layer1.setVisible(value);
		mosaicObj.layer2.setVisible(value);
	}

	getResolutions(projection) {
		var projExtent = projection.getExtent();
    var startResolution = OlExtent.getWidth(projExtent) / 256;
    var resolutions = new Array(22);
    for (var i = 0, ii = resolutions.length; i < ii; ++i) {
      resolutions[i] = startResolution / Math.pow(2, i);
    }

    return resolutions
	}

	createVectorLayer(layerName, strokeColor, width) {
    return new VectorLayer({
    	name: layerName,
      source: new VectorSource(),
	    style: [
	      new Style({
	        stroke: new Stroke({
	          color: '#dedede',
	          width: width+1
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

 createMap() {
		this.createLayers()
    this.map = new OlMap({
      target: 'map',
      layers: this.layers,
      view: new OlView({
	      projection: this.projection,
	      zoom: this.currentZoom,
	    }),
	    loadTilesWhileAnimating: true,
    	loadTilesWhileInteracting: true 
    });

    
    var select = new Select({
			condition: Condition.pointerMove,
			layers: [this.fieldValidation],
			style: new Style({
        stroke: new Stroke({
          color: '#ff1800',
          width: 4
        })
      })
    });

    select.on('select', function(event) {
	    	if(event.selected.length > 0) {
	    		var featureSel = event.selected[0]
	    		this.closeInfo = false;
		    	this.infoFeature = {
		    		foto: '/assets/fotos_campo/' + featureSel.get('foto'),
		    		uso: featureSel.get('uso'),
		    		fitoViz: featureSel.get('fito_viz'),
		    		obs: featureSel.get('obs')
		    	}
		    	
	    	}
    	}.bind(this));

		this.map.addInteraction(select);


    /*var map = this.map
    map.on('pointermove', function(browserEvent) {
    var coordinate = browserEvent.coordinate;
    var pixel = map.getPixelFromCoordinate(coordinate);
    var features = map.getFeaturesAtPixel(pixel, {
    	'layerFilter': function(layerCandidate) {
    		if (layerCandidate.type == 'VECTOR' && layerCandidate.get('name') == 'fieldValidation') {
    			return true
    		} else {
    			return false
    		}
    	}
    });

    var selFeatures = select.getFeatures({
    	layers: [this.fieldValidation]
    });

    //selFeatures.clear()
    if(features)
    	selFeatures.push(features);


  	});*/
	}

	getUrls(layername, filter) {
		
		var result = []

		var msfilter = ""
		if(filter)
			msfilter = '&MSFILTER='+this.parseParams(filter)
		
		for (let url of this.urls) {
			result.push(url
				+ "?layers=" + this.parseParams(layername)
				+ msfilter
				+ "&mode=tile&tile={x}+{y}+{z}"
				+ "&tilemode=gmap" 
				+ "&map.imagetype=png"
			);
		}

		return result;
	}

 createTMSLayer(layername, visible, opacity, filter) {
		return new OlTileLayer({
			source: new OlXYZ({
				urls: this.getUrls(layername, filter)
			}),
			tileGrid: this.tileGrid,
			visible: visible,
			opacity: opacity
		});
	}

	parseParams(input) {
		input = input.replace(new RegExp('{start_year}', 'g'), this.selectedPeriod.startYear)
		input = input.replace(new RegExp('{end_year}', 'g'), this.selectedPeriod.endYear)

		var regionQuery = ''
		if (this.selectRegion.type == 'city')
  		regionQuery = " AND county = '"+this.selectRegion.value+"'"
  	else if (this.selectRegion.type == 'state')
  		regionQuery = "AND uf = '"+this.selectRegion.value+"'"


		input = input.replace(new RegExp('{region_query}', 'g'), regionQuery)
		return input
	}

	createLayers() {
		var olLayers: OlTileLayer[] = new Array();

		this.sentinel = {
			label: 'Mosaicos Sentinel do Cerrado',
			tooltip: 'Mosaico Landsat Tooltip',
			layername1: "bi_ce_mosaico_sentinel_10_{start_year}_lapig",
			layername2: "bi_ce_mosaico_sentinel_10_{end_year}_lapig",
			visible: false,
			opacity: 1
		}

		this.landsat = {
			label: 'Mosaicos Landsat do Cerrado',
			tooltip: 'Mosaico Landsat Tooltip',
			layername1: "bi_ce_mosaico_landsat_completo_30_{start_year}_fip",
			layername2: "bi_ce_mosaico_landsat_completo_30_{end_year}_fip",
			visible: false,
			opacity: 1
		}

		this.sucetibilidade = {
			label: 'Susceptibilidade a desmatamentos > 0.25 km2',
			layername: 'bi_ce_susceptibilidade_desmatamento_maiores_100_na_lapig',
			visible: false,
			opacity: 1
		}

		this.desmatamento = {
			label: 'Desmatamentos PRODES',
			layername: 'bi_ce_prodes_desmatamento_100_fip',
			layerfilter: 'year = {end_year} {region_query}',
			visible: true,
			opacity: 1
		}

		this.antropico = {
			label: 'Área Antrópica até',
			layername: 'bi_ce_prodes_antropico_100_fip',
			layerfilter: '(year < {end_year} OR (year = {start_year})) {region_query}',
			visible: false,
			opacity: 1
		}

		this.fieldValidation = this.createVectorLayer('fieldValidation', '#fc16ef', 3);
		this.deforestationAll = this.createTMSLayer(this.desmatamento.layername, this.desmatamento.visible, this.desmatamento.opacity, this.desmatamento.layerfilter)

		this.sentinel['layer1'] = this.createTMSLayer(this.sentinel.layername1, this.sentinel.visible, this.sentinel.opacity, '')
		this.sentinel['layer2'] = this.createTMSLayer(this.sentinel.layername2, this.sentinel.visible, this.sentinel.opacity, '')
		this.landsat['layer1'] = this.createTMSLayer(this.landsat.layername1, this.landsat.visible, this.landsat.opacity, '')
		this.landsat['layer2'] = this.createTMSLayer(this.landsat.layername2, this.landsat.visible, this.landsat.opacity, '')
		this.sucetibilidade['layer'] = this.createTMSLayer(this.sucetibilidade.layername, this.sucetibilidade.visible, this.sucetibilidade.opacity, '')
		this.desmatamento['layer'] = this.deforestationAll
		this.antropico['layer'] = this.createTMSLayer(this.antropico.layername, this.antropico.visible, this.antropico.opacity, this.antropico.layerfilter)
		this.regions = this.createVectorLayer('regions', '#ffea00', 1);

		this.fieldValidation.setVisible(false);

		this.layers.push(this.sentinel['layer1'])
		this.layers.push(this.sentinel['layer2'])
		this.layers.push(this.landsat['layer1'])
		this.layers.push(this.landsat['layer2'])
		this.layers.push(this.sucetibilidade['layer'])
		this.layers.push(this.antropico['layer'])
		this.layers.push(this.desmatamento['layer'])
		this.layers.push(this.regions)
		this.layers.push(this.fieldValidation)


		this.layers = this.layers.concat(olLayers.reverse());

	}

	calculateTotalDeforestaton() {
		this.charts.deforestation = 0;
		this.charts.timeseries[0].series.forEach(function(serie) {
			if(this.mapDescriptor.years.start <= serie.year && serie.year <= this.mapDescriptor.years.end) {
				this.charts.deforestation += serie.value
			}
		}.bind(this))
	}

	changeChart(newChartType) {
		this.chartType = newChartType;
		if(newChartType == 'bioma') {
			this.chartResult = this.charts.timeseries
		} else if(newChartType == 'estados') {
			this.chartResult = this.charts.state
		}
	}

	updatePeriod() {
		
		var l1Source = this.landsat.layer1.getSource()
		l1Source.setUrls(this.getUrls(this.landsat.layername1, ''))

		var l2Source = this.landsat.layer2.getSource()
		l2Source.setUrls(this.getUrls(this.landsat.layername2, ''))
		
		if(this.selectedDeforestationOpt.value != 'VALIDATED'){
			var dSource = this.desmatamento.layer.getSource()
			dSource.setUrls(this.getUrls(this.desmatamento.layername, this.desmatamento.layerfilter))
			dSource.refresh()
		}

		var aSource = this.antropico.layer.getSource()
		aSource.setUrls(this.getUrls(this.antropico.layername, this.antropico.layerfilter))

		if(this.selectedPeriod.endYear != 2017) {
			this.mosaicVisible(this.sentinel, false)
		}

		l1Source.refresh()
		l2Source.refresh()
		aSource.refresh()

		this.updateCharts();
	}

	addValidationPolygons() {
		var fieldValidationUrl = '/service/map/field-validation';
		this.http.get(fieldValidationUrl).subscribe(fieldValResult => {
				var features = (new GeoJSON()).readFeatures(fieldValResult, {
				  dataProjection : 'EPSG:4326',
				  featureProjection: 'EPSG:3857'
				});
				var regionSource = this.fieldValidation.getSource();
				this.polValidados = features.length;
				regionSource.clear()
				regionSource.addFeatures(features)
			})

	}

	updateCharts() {

		var regionParams = ''
		if (this.selectRegion.type != '')
			regionParams = "&type="+this.selectRegion.type+"&region="+this.selectRegion.value

		var timeseriesUrl = '/service/deforestation/timeseries?year='+this.selectedPeriod.startYear+regionParams;
		var statesUrl = '/service/deforestation/states?year='+this.selectedPeriod.endYear;
		var citiesUrl = '/service/deforestation/cities?year='+this.selectedPeriod.endYear+regionParams;
		var extenUrl = '/service/map/extent?'+regionParams;
		
		this.changeChart('bioma');
		
		this.http.get(timeseriesUrl).subscribe(timeseriesResult => {
			this.charts.timeseries = timeseriesResult;
			this.indicator = timeseriesResult[0].indicator;
			this.chartResult = this.charts.timeseries;
		});
		
		var map = this.map
		if (this.selectRegion.type != '') {
			this.http.get(extenUrl).subscribe(extentResult => {
				var features = (new GeoJSON()).readFeatures(extentResult, {
				  dataProjection : 'EPSG:4326',
				  featureProjection: 'EPSG:3857'
				});
				var regionSource = this.regions.getSource();
				regionSource.clear()
				regionSource.addFeature(features[0])
				var extent = features[0].getGeometry().getExtent();
				map.getView().fit(extent, { duration: 1500 });
			})
		}

		if (this.selectRegion.type != 'city') {
			this.http.get(citiesUrl).subscribe(citiesResult => {
				this.charts.cities = citiesResult;
			})
		}
  		
  	if (this.selectRegion.type != 'state' || this.selectRegion.type != 'city') {
			this.http.get(statesUrl).subscribe(statesResult => {
				this.charts.state = statesResult;
			})
  	}

	}

	ngOnInit() {

		this.http.get('/service/map/periods').subscribe(periods => {
			this.periods = periods
			this.selectedPeriod = this.periods[0]
			this.createMap();
			this.updateCharts();
			this.addValidationPolygons();
		})

	}

}
