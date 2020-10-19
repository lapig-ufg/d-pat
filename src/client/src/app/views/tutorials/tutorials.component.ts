import {Component, EventEmitter, Inject, Input, Optional, OnInit, Output} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css']
})
export class TutorialsComponent implements OnInit {
  controls: any = {};
  innerHeigth: number;
  constructor(
      public dialogRef: MatDialogRef<TutorialsComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.controls = data.controls;
    this.innerHeigth = window.innerHeight  - 300;
  }

  ngOnInit() {
  }

}
