import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as ol from 'openlayers';

import OlMap from 'ol/map';
import OlXYZ from 'ol/source/xyz';
import OlTileLayer from 'ol/layer/tile';
import TileGrid from 'ol/tilegrid/tilegrid';
import TileWMS from 'ol/source/tilewms';
import OlView from 'ol/view';
import OlProj from 'ol/proj';
import OlExtent from 'ol/extent';
import TileUTFGrid from 'ol/source/tileutfgrid';
import Overlay from 'ol/overlay';
import _ol_TileUrlFunction_ from 'ol/tileurlfunction.js';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
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
	infoOverlay: Overlay;
	infodata: any;
	currentZoom: Number;
	
	landsat: any;
	desmatamento: any;
	antropico: any;

	charts: any;
	chartResult: any;
	chartType: String;

	urls: Array<String>;
	periods: any;
	selectedPeriod: any;

	collapseLayer: boolean;
	collapseCharts: boolean;
	sliderOptions: any;

	constructor(private http: HttpClient) { 
		
		this.infodata = { area_desmatada: -1};
		this.projection = OlProj.get('EPSG:900913');
		this.currentZoom = 4;

		this.chartType = 'bioma';

		this.charts = { 
			timeseries: {},
			state: {}
		}

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

	}

	private landsatOpacity(event) {
		this.landsat.layer2.setOpacity(event.value)
	}

	private landsatVisible(value){
		this.landsat.layer1.setVisible(value);
		this.landsat.layer2.setVisible(value);
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
		this.createLayers()
    this.map = new OlMap({
      target: 'map',
      layers: this.layers,
      view: new OlView({
	      center: OlProj.fromLonLat([-44, -14]),
	      projection: this.projection,
	      zoom: this.currentZoom,
	    }),
	    loadTilesWhileAnimating: true,
    	loadTilesWhileInteracting: true 
    });
	}

	private getUrls(layername, filter) {
		
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

	private createTMSLayer(layername, visible, opacity, filter) {
		return new OlTileLayer({
			source: new OlXYZ({
				urls: this.getUrls(layername, filter)
			}),
			tileGrid: this.tileGrid,
			visible: visible,
			opacity: opacity
		});
	}

	private parseParams(input) {
		input = input.replace(new RegExp('{start_year}', 'g'), this.selectedPeriod.startYear)
		input = input.replace(new RegExp('{end_year}', 'g'), this.selectedPeriod.endYear)
		return input
	}

	private createLayers() {
		var olLayers: OlTileLayer[] = new Array();

		this.landsat = {
			label: 'Mosaicos Landsat do Cerrado',
			tooltip: 'Mosaico Landsat Tooltip',
			layername1: "bi_ce_mosaico_landsat_30_{start_year}_lapig",
			layername2: "bi_ce_mosaico_landsat_30_{end_year}_lapig",
			visible: true,
			opacity: 1
		}

		this.desmatamento = {
			label: 'Desmatamento',
			layername: 'bi_ce_prodes_desmatamento_100_fip',
			layerfilter: 'year = {end_year} AND baseline = FALSE',
			visible: true,
			opacity: 1
		}

		this.antropico = {
			label: 'Área Antrópica até',
			layername: 'bi_ce_prodes_antropico_100_fip',
			layerfilter: 'year < {start_year} OR (year = {start_year} AND baseline = TRUE)',
			visible: true,
			opacity: 1
		}

		this.landsat['layer1'] = this.createTMSLayer(this.landsat.layername1, this.landsat.visible, this.landsat.opacity, '')
		this.landsat['layer2'] = this.createTMSLayer(this.landsat.layername2, this.landsat.visible, this.landsat.opacity, '')
		this.desmatamento['layer'] = this.createTMSLayer(this.desmatamento.layername, this.desmatamento.visible, this.desmatamento.opacity, this.desmatamento.layerfilter)
		this.antropico['layer'] = this.createTMSLayer(this.antropico.layername, this.antropico.visible, this.antropico.opacity, this.antropico.layerfilter)

		this.layers.push(this.landsat['layer1'])
		this.layers.push(this.landsat['layer2'])
		this.layers.push(this.desmatamento['layer'])
		this.layers.push(this.antropico['layer'])

		this.layers.push()
		this.layers = this.layers.concat(olLayers.reverse());

	}

	private getLegendUrl(layer) {
		return 'http://maps.lapig.iesa.ufg.br/ows?TRANSPARENT=TRUE&VERSION=1.1.1&SERVICE=WMS&REQUEST=GetLegendGraphic&'
				 + 'LAYER=&format=image/png'
	}

	private calculateTotalDeforestaton() {
		this.charts.deforestation = 0;
		this.charts.timeseries[0].series.forEach(function(serie) {
			if(this.mapDescriptor.years.start <= serie.year && serie.year <= this.mapDescriptor.years.end) {
				this.charts.deforestation += serie.value
			}
		}.bind(this))
	}

	private changeChart(newChartType) {
		this.chartType = newChartType;
		if(newChartType == 'bioma') {
			this.chartResult = this.charts.timeseries
		} else if(newChartType == 'estados') {
			this.chartResult = this.charts.state
		}
	}

	private updatePeriod() {
		
		var l1Source = this.landsat.layer1.getSource()
		l1Source.setUrls(this.getUrls(this.landsat.layername1, ''))

		var l2Source = this.landsat.layer2.getSource()
		l2Source.setUrls(this.getUrls(this.landsat.layername2, ''))
		
		var dSource = this.desmatamento.layer.getSource()
		dSource.setUrls(this.getUrls(this.desmatamento.layername, this.desmatamento.layerfilter))

		var aSource = this.antropico.layer.getSource()
		aSource.setUrls(this.getUrls(this.antropico.layername, this.antropico.layerfilter))

		l1Source.refresh()
		l2Source.refresh()
		dSource.refresh()
		aSource.refresh()

		this.updateCharts();
	}

	private updateCharts() {
		var chartByYearUrl = '/service/map/chartsByYear?year='+this.selectedPeriod.endYear;

		this.http.get(chartByYearUrl).subscribe(charts => {
			this.charts.state = charts['state'];
			this.charts.cities = charts['cities'];
			this.changeChart(this.chartType);
		})
	}

	ngOnInit() {

		this.http.get('/service/map/periods').subscribe(periods => {
			this.periods = periods
			console.log(periods)
			this.selectedPeriod = this.periods[0]
			
			this.http.get('/service/map/charts').subscribe(charts => {
				this.charts = charts;
				this.chartResult = this.charts.timeseries;
				this.updateCharts();
				this.createMap();
			});

		})

	}

}
