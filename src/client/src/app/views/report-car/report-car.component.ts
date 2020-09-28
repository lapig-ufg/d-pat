import {Component, Inject, Optional, OnInit, Output, EventEmitter} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-report-car',
  templateUrl: './report-car.component.html',
  styleUrls: ['./report-car.component.css']
})
export class ReportCarComponent implements OnInit {
  innerHeigth: number;
  dados: any = {};
  loading: boolean;
  @Output() print = new EventEmitter<string>();
  constructor(
      public dialogRef: MatDialogRef<ReportCarComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public params: any
  ) { }

  ngOnInit() {
    this.loading = false;
    this.innerHeigth = window.innerHeight  - 180;
    this.dados = this.params.dados;
  }
  closeDialog() {
    const dialog = document.querySelector('.cdk-overlay-container');
    dialog.innerHTML = '';
    // this.dialogRef.close({event: 'close'});
  }
}
