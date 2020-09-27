import {Component, OnInit, ElementRef, OnDestroy, AfterViewInit, HostListener} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Router } from '@angular/router';
import { HotsiteComponent } from '../hotsite/hotsite.component';

declare  var $: any;
@Component({
  selector: 'app-mobile',
  templateUrl: './mobile.component.html'
  // styleUrls: ['./mobile.component.css']
})
export class MobileComponent extends HotsiteComponent {

}
