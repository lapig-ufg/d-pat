import { Component, OnInit } from '@angular/core';
import { SearchService, MapComponent } from '../map.component';

@Component({
  selector: 'app-map-mobile',
  templateUrl: './map-mobile.component.html',
  providers: [SearchService],
  styleUrls: ['./map-mobile.component.css']
})
export class MapMobileComponent extends MapComponent {

}
