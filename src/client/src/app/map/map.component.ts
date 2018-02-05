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
		'./map.component.css'
	]
})
export class MapComponent implements OnInit {

	map: OlMap;
	layers: Array<TileWMS>;
	projection: OlProj;
	tileGrid: TileGrid;
	utfgridsource: TileUTFGrid;
	infoOverlay: Overlay;
	infodata: Object;
	currentZoom: Number;

	urls: any;
	indexedLayers: any;
	tileloading: Number;

	mapDescriptor: any;
	isCollapsed: boolean;
	widthMap: Number;

	constructor(private http: HttpClient) { 
		this.indexedLayers = {};
		this.mapDescriptor = {};
		this.infodata = { area_desmatada: -1};
		this.tileloading = 0;
		this.projection = OlProj.get('EPSG:900913');
		this.currentZoom = 4;

		this.urls = [
    	'http://m1.lapig.iesa.ufg.br/ows',
    	'http://m2.lapig.iesa.ufg.br/ows',
    	'http://m3.lapig.iesa.ufg.br/ows',
    	'http://m4.lapig.iesa.ufg.br/ows'
    ];

		this.tileGrid = new TileGrid({
    	extent: this.projection.getExtent(),
    	resolutions: this.getResolutions(this.projection),
      tileSize: 512
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

	private visibility(layer) {
		this.indexedLayers[layer.id].setVisible(layer.enabled);
		this.updataLayers();
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
    
		this.infoOverlay = new Overlay({
      element: document.getElementById('map-info'),
      offset: [15, 15],
      stopEvent: false
    });
    

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

    this.map.addOverlay(this.infoOverlay);

    this.map.getView().on('change:resolution', function(evt) {
    	this.currentZoom = this.map.getView().getZoom();
    	for (let layer of this.mapDescriptor.layers) {
    		this.updateTooltip(layer)
    		if(layer.minZoom >= this.currentZoom) {
    			layer.enabled = false;
    			this.visibility(layer);
    		}
    	}

    }.bind(this));

		this.map.on('pointermove', function(evt) {
			if (evt.dragging) {
				return;
			}
			
			var infoOverlay = this.infoOverlay;
			var coordinate = this.map.getEventCoordinate(evt.originalEvent);
			var viewResolution = this.map.getView().getResolution();

	    this.utfgridsource.forDataAtCoordinateAndResolution(coordinate, viewResolution,
        function (data) { 
        	if(data) {
	        	this.infodata = data;
	        	this.infoOverlay.setPosition(coordinate);
        	} else {
        		this.infodata = { area_desmatada: -1}
        	}
        }.bind(this));
		}.bind(this));
	}

	private collapseSidebar() {
		this.isCollapsed = !this.isCollapsed;

		this.widthMap = 12;
		if(!this.isCollapsed) {
			this.widthMap = 7;
		}
	}

	private applYearRestrictions() {
		if(this.mapDescriptor) {
			this.mapDescriptor.years.startValues = [];
			this.mapDescriptor.years.endValues = [];

			for (let y of this.mapDescriptor.years.values) {
				if(y <= this.mapDescriptor.years.end) {
					this.mapDescriptor.years.startValues.push(y);
				}
				if(y >= this.mapDescriptor.years.start) {
					this.mapDescriptor.years.endValues.push(y);
				}
			}
		}
	}

	private getDisplayName(layer) {
		return layer.label
									.replace('{start_year}', this.mapDescriptor.years.start)
									.replace('{end_year}', this.mapDescriptor.years.end);
	}

	private getTileJSON() {

		var utfgridLayers = []
		for (let layer of this.mapDescriptor.layers) {
			if(layer.utfgrid && layer.enabled) {
				console.log(layer)
				utfgridLayers.push(this.getOwsLayername(layer));
			}
		}

		return {
			version: "2.1.0",
			grids: [
				"http://maps.lapig.iesa.ufg.br/ows?layers="+utfgridLayers.join(',')
				+ "&startyear="+this.mapDescriptor.years.start
				+ "&endyear="+this.mapDescriptor.years.end
				+ "&mode=tile&tile={x}+{y}+{z}&tilemode=gmap&map.imagetype=utfgrid" 
			]
		}
	}

	private getOwsLayername(layer) {
		var owsLayer = layer.ows_layer;
		if (layer.options != false) {
			for (let v of layer.options.values) {
				if (v.id == layer.options.selectedValue) {
					owsLayer = v.ows_layer
				}
			}
		}

		return owsLayer;
	}

	private getOwsParams(layer) {
		
		var owsLayer = this.getOwsLayername(layer);
		var owsParams = {
    	'LAYERS': owsLayer, 
    	'TILED': true,
    	'VERSION': '1.1.1'
    }

		if(layer.sendYears) {
			owsParams['STARTYEAR'] = this.mapDescriptor.years.start;
			owsParams['ENDYEAR'] = this.mapDescriptor.years.end;
		}

		owsParams['LAYERS'] = owsLayer
										.replace('{start_year}', this.mapDescriptor.years.start)
										.replace('{end_year}', this.mapDescriptor.years.end);

		return owsParams;
	}

	private updateTooltip(layer) {
		if(layer.minZoom >= this.currentZoom) {
			layer.tooltip = 'Dê o zoom em alguma região do mapa para habiltar esta camada.';
		} else {
			layer.tooltip = '';
		}
	}

	private createLayers() {
		var olLayers: OlTileLayer[] = new Array();

		for (let layer of this.mapDescriptor.layers) {
			this.updateTooltip(layer)
			var olLayer = new OlTileLayer({
        source: new TileWMS({
          urls: this.urls,
          params: this.getOwsParams(layer),
          serverType: 'mapserver',
          tileGrid: this.tileGrid
        }),
        visible: layer.enabled
    	});

			olLayer.getSource().on('tileloadstart', function() {
				console.log(this.tileloading)
				this.tileloading = this.tileloading + 1
			}.bind(this));

			olLayer.getSource().on('tileloadend', function() {
				this.tileloading = this.tileloading - 1
				console.log(this.tileloading)
			}.bind(this));

			this.indexedLayers[layer.id] = olLayer;
			olLayers.push(olLayer);
		}

		this.layers = this.layers.concat(olLayers.reverse());

		this.utfgridsource = new TileUTFGrid({
			tileJSON: this.getTileJSON()
		});

		var utfgridLayer = new OlTileLayer({
    	source: this.utfgridsource
    });

    this.layers.push(utfgridLayer)
	}

	private updataLayers() {

		this.widthMap = 7;
		this.applYearRestrictions();

		for (let layer of this.mapDescriptor.layers) {
			layer.displayLabel = this.getDisplayName(layer)
			
			if (this.indexedLayers[layer.id]) {
				
				var wmsSource = this.indexedLayers[layer.id].getSource();
				var params = wmsSource.getParams();
				var newParams = this.getOwsParams(layer)
				wmsSource.updateParams(newParams);
				wmsSource.changed();
			}
		}

		if(this.utfgridsource) {
			var tileJSON = this.getTileJSON();
			this.utfgridsource.tileUrlFunction_ = _ol_TileUrlFunction_.createFromTemplates(tileJSON.grids, this.utfgridsource.tileGrid);
			this.utfgridsource.refresh();
		}
	}

	ngOnInit() {

		this.http.get('/service/map/layers').subscribe(mapDescriptor => {
			this.mapDescriptor = mapDescriptor;
			this.updataLayers();
			this.createMap();
		});
	}

}
