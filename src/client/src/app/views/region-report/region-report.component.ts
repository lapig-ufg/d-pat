import {Component, Inject, Input, Optional, OnInit, HostListener} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-region-report',
  templateUrl: './region-report.component.html',
  styleUrls: ['./region-report.component.css']
})
export class RegionReportComponent implements OnInit {
  innerHeigth: number;
  data: any;
  loading: boolean;
  constructor(
      public dialogRef: MatDialogRef<RegionReportComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    this.loading = false;
    this.innerHeigth = window.innerHeight  - 180;
    this.data = params;
    console.log(params);
  }

  ngOnInit() {
  }
  closeDialog() {
    this.dialogRef.close({event: 'close'});
  }

}
