import { Component, Inject, Input, Optional, OnInit, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-region-report',
  templateUrl: './region-report.component.html'
})
export class RegionReportComponent implements OnInit {
  innerHeigth: number;
  dados: any = {};
  texts: any = {};
  loading: boolean;
  svgLoading: string;
  constructor(
      private http: HttpClient,
      public dialogRef: MatDialogRef<RegionReportComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    this.loading = false;
    this.innerHeigth = window.innerHeight  - 180;
    this.dados = params.dados;
    this.svgLoading = '/assets/img/loading.svg';
    console.log(this.dados);
  }

  ngOnInit() {
    this.getTexts();
  }
  async getTexts() {
    const langParam = this.dados.language;
    const url = '/service/deforestation/regionReportTexts?' + langParam;
    this.texts = await this.http.get(url).toPromise();
    if ( this.dados.metadata[0].type === 'state') {
      this.texts['label_title'] = this.texts.label_title_state.replace('[state]', this.dados.metadata[0].region_display);
      this.texts['label_info'] = this.texts.label_info_state;
    } else {
      this.texts['label_title'] = this.texts.label_title_county.replace('[county]', this.dados.metadata[0].region_display);
      this.texts['label_info'] = this.texts.label_info_county;
    }
  }
  closeDialog() {
    this.dialogRef.close({event: 'close'});
  }

}
