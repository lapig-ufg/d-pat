import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'toh-spinner-img',
  templateUrl: './spinner-img.component.html',
  styleUrls: ['./spinner-img.component.css']
})
export class SpinnerImgComponent implements OnInit {

  @Input() imgSrc: String;
  @Input() spinnerSrc: String;
  @Input() imgContainerClass: String;

  loading: boolean = true

  @Input() largura : any;

  @Input() altura : any;
  
  constructor() { }

  ngOnInit() {
  }

  onLoad() {
    this.loading = false;
  }

}
