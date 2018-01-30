import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as ol from 'openlayers';

import OlMap from 'ol/map';
import OlXYZ from 'ol/source/xyz';
import OlTileLayer from 'ol/layer/tile';
import OlView from 'ol/view';
import OlProj from 'ol/proj';

@Component({
	selector: 'app-map',
	templateUrl: './map.component.html',
	styleUrls: [
		'./map.component.css'
	]
})
export class MapComponent implements OnInit {

	constructor(private http: HttpClient) { }

	mapDescriptor: any;
	map: OlMap;
	source: OlXYZ;
	layer: OlTileLayer;
	view: OlView;
	isCollapsed: false;

	private applYearRestrictions() {

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

	private updataLayers() {

		this.applYearRestrictions();

		for (let d of this.mapDescriptor.layers) {
			if(d.concatEndYear) {
				d.displayLabel = d.label + String(this.mapDescriptor.years.end);
			} else if (d.concatStartYear) {
				d.displayLabel = d.label + String(this.mapDescriptor.years.start);
			} else {
				d.displayLabel = d.label;
			}
		}
	}

	ngOnInit() {

		this.source = new OlXYZ({
      // Tiles from Mapbox (Light)
      url: 'https://api.tiles.mapbox.com/v4/mapbox.light/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw'
    });

    this.layer = new OlTileLayer({
      source: this.source
    });

    this.view = new OlView({
      center: OlProj.fromLonLat([6.661594, 50.433237]),
      zoom: 3,
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });

		this.http.get('/service/map/layers').subscribe(mapDescriptor => {
			this.mapDescriptor = mapDescriptor;
			this.updataLayers();
		});
	}

}
