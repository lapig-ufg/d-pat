import {Component, Inject, Optional, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html'
})
export class ChartsComponent implements OnInit {
  innerHeigth: number;
  title: string;
  description: string;
  type: any = {};
  data: any = {};
  options: any = {};
  constructor(
      public dialogRef: MatDialogRef<ChartsComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    console.log(params);
    this.innerHeigth = window.innerHeight  - 180;
    this.title = params.ob.title;
    this.description = params.ob.description;
    this.type = params.ob.type;
    this.data = params.ob.data;
    this.options = params.ob.options;
  }

  ngOnInit() {
  }

}
