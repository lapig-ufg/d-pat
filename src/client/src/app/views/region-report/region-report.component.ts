import { Component, Inject, Input, Optional, OnInit, HostListener } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Lightbox } from 'ngx-lightbox';
import * as moment from 'moment';
import logos from '../logos';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
      private lightBox: Lightbox,
      public dialogRef: MatDialogRef<RegionReportComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    this.loading = false;
    this.innerHeigth = window.innerHeight  - 180;
    this.dados = params.dados;
    this.svgLoading = '/assets/img/loading.svg';
  }

  ngOnInit() {
    this.getTexts();
  }
  async getTexts() {
    const langParam = this.dados.language;
    const url = '/service/deforestation/regionReportTexts?' + langParam;
    this.texts = await this.http.get(url).toPromise();
    if ( this.dados.region.metadata[0].type === 'state') {
      this.texts['label_title'] = this.texts.label_title_state.replace('[state]', this.dados.region.metadata[0].region_display);
      this.texts['label_info'] = this.texts.label_info_state;
      this.texts['label_region'] = this.texts.label_state;
    } else {
      this.texts['label_title'] = this.texts.label_title_county.replace('[county]', this.dados.region.metadata[0].region_display);
      this.texts['label_info'] = this.texts.label_info_county;
      this.texts['label_region'] = this.texts.label_county;
    }
  }

  openLightBoxTerraClass(): void {
    this.lightBox.open(this.dados.region.terraclass);
  }

  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }


  async printReportCounty() {
    this.loading = true;
    let language = this.dados.language.replace('lang=', '');
    let self = this;

    let document = {
      pageSize: 'A4',
      // by default we use portrait, you can change it to landscape if you wish
      pageOrientation: 'portrait',

      // [left, top, right, bottom]
      pageMargins: [40, 70, 40, 80],

      header: {
        margin: [24, 10, 24, 30],
        columns: [
          {
            image: logos.logoDPAT,
            width: 130
          },
          {
            // [left, top, right, bottom]
            margin: [65, 15, 10, 10],
            text: this.texts.label_title.toUpperCase(),
            style: 'titleReport',
          },

        ]
      },
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: '*',
            body: [
              [
                { image: logos.signature, colSpan: 3, alignment: 'center', fit: [300, 43] },
                {},
                {},
              ],
              [
                { text: 'https://cerradodpat.org', alignment: 'left', style: 'textFooter', margin: [60, 0, 0, 0] },
                { text: moment().format('DD/MM/YYYY HH:mm:ss'), alignment: 'center', style: 'textFooter', margin: [0, 0, 0, 0] },
                { text: logos.page.title[language] + currentPage.toString() + logos.page.of[language] + '' + pageCount, alignment: 'right', style: 'textFooter', margin: [0, 0, 60, 0] },
              ],
            ]
          },
          layout: 'noBorders'
        };
      },
      content: [],
      styles: {
        titleReport: {
          fontSize: 16,
          bold: true
        },
        textFooter: {
          fontSize: 9
        },
        textImglegend: {
          fontSize: 9
        },
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        data: {
          bold: true,
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        codCar: {
          fontSize: 11,
          bold: true,
        },
        textObs: {
          fontSize: 11,
        },
        tableDpat: {
          margin: [0, 5, 0, 15],
          fontSize: 11,
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        metadata: {
          background: '#0b4e26',
          color: '#fff'
        }
      }
    };

    if (this.dados.region.metadata) {
      // @ts-ignore
      let columns = [];
      let legend = [];

      document.content.push({ text: this.texts.label_info, style: 'subheader' });

      // legend.push(
      //     {
      //       text: this.textOnDialog.analise_automatica.info_bfast_description +
      //           this.dataBfast.prob_Formatada,
      //       alignment: 'justify',
      //       margin: [0, 10, 15, 0],
      //       style: 'data'
      //     }
      // );

      columns.push(
          {
            image: await self.getBase64ImageFromUrl(self.dados.region.terraclass.imgLarge),
            width: 300,
            margin: 5,
            alignment: 'center'
          },
          // legend,
      );

      document.content.push({ columns: columns });
    }

    const filename = 'report-county-' + self.dados.region.metadata[0].region_display + '.pdf';

    pdfMake.createPdf(document).download(filename);
    this.loading = false;
  }

  closeDialog() {
    this.dialogRef.close({event: 'close'});
  }

}
