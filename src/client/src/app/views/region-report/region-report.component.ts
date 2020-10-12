import { Component, Inject, Input, Optional, OnInit, HostListener } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Lightbox } from 'ngx-lightbox';
import * as moment from 'moment';
import logos from '../logos';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { GoogleAnalyticsService } from '../../services/google-analytics.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
declare let html2canvas: any;

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
  urlTerraClass: Array<{ src: string; caption: string; thumb: string }> = [];
  urlImagesLandSat: Array<{ src: string; caption: string; thumb: string }> = [];
  constructor(
    private http: HttpClient,
    private lightBox: Lightbox,
    private decimalPipe: DecimalPipe,
    public dialogRef: MatDialogRef<RegionReportComponent>,
    public googleAnalyticsService: GoogleAnalyticsService,
    @Optional() @Inject(MAT_DIALOG_DATA) public params: any
  ) {
    this.loading = false;
    this.innerHeigth = window.innerHeight - 180;
    this.dados = params.dados;
    this.svgLoading = '/assets/img/loading.svg';
    this.setConfigChart();
  }

  ngOnInit() {
    this.getTexts();

    let register_event = this.dados.region.metadata[0].type + "_" + this.dados.region.metadata[0].region_display
    this.googleAnalyticsService.eventEmitter("openRegionsReport", "Region_Report", register_event, 12);

  }

  async getTexts() {
    const langParam = this.dados.language;
    const url = '/service/deforestation/regionReportTexts?' + langParam;
    this.texts = await this.http.get(url).toPromise();
    this.texts['label_img_mun'] = 'TerraClass Cerrado';
    if (this.dados.region.metadata[0].type === 'state') {
      this.texts['label_title'] = this.texts.label_title_state.replace('[state]', this.dados.region.metadata[0].region_display);
      this.texts['label_info'] = this.texts.label_info_state;
      this.texts['label_region'] = this.texts.label_state;
    } else {
      this.texts['label_title'] = this.texts.label_title_county.replace('[county]', this.dados.region.metadata[0].region_display);
      this.texts['label_info'] = this.texts.label_info_county;
      this.texts['label_region'] = this.texts.label_county;
    }
  }
  setConfigChart() {
    this.dados.graphic.options['showAllTooltips'] = true;
    this.dados.graphic.options['responsive'] = true;
  }

  openLightBoxTerraClass(): void {
    const ob = {
      src: this.dados.region.terraclass.imgLarge,
      caption: this.texts.label_img_mun,
      thumb: this.dados.region.terraclass.imgSmall
    };
    this.urlTerraClass.push(ob);
    this.lightBox.open(this.urlTerraClass);
  }

  openLightBoxImagesLandSat(image): void {
    this.urlImagesLandSat = [];
    const ob = {
      src: image.imgLarge,
      caption: this.texts.label_year + ' ' + image.year + ' | ' + image.region_display,
      thumb: image.imgLarge
    };
    this.urlImagesLandSat.push(ob);
    this.lightBox.open(this.urlImagesLandSat);
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
  async canvasToBase64Chart() {
    let canvas = await html2canvas(document.querySelector("#reportChart"));
    return canvas.toDataURL('image/png');
  }
  separar(base, maximo) {
    let resultado = [[]];
    let grupo = 0;

    for (let indice = 0; indice < base.length; indice++) {
      if (resultado[grupo] === undefined) {
        resultado[grupo] = [];
      }

      resultado[grupo].push(base[indice]);

      if ((indice + 1) % maximo === 0) {
        grupo = grupo + 1;
      }
    }
    return resultado;
  }

  async printReportCounty() {


    let register_event = this.dados.region.metadata[0].type + "_" + this.dados.region.metadata[0].region_display
    this.googleAnalyticsService.eventEmitter("printRegionsReport", "Print_Report", register_event, 11);

    this.loading = true;
    let language = this.dados.language.replace('lang=', '');
    let self = this;

    pdfMake.tableLayouts = {
      countyLayout: {
        hLineWidth: function (i, node) { return 1; },
        vLineWidth: function (i, node) { return 0; },
        fillColor: function (i, node) { return 'white'; },
        paddingLeft: function (i, node) { return 10; }
      }
    };


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
                { image: logos.signature, colSpan: 3, alignment: 'center', fit: [400, 45] },
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
        tableDpatImage: {
          fontSize: 7,
        },
        tableHeader: {
          bold: true,
          fontSize: 13,
          color: 'black'
        },
        citySummary: {
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
      legend.push({ text: this.texts.label_metadata.toUpperCase(), alignment: 'left', style: 'data', margin: [0, 5, 0, 5] });
      // @ts-ignore
      let table = {
        style: 'tableDpat', layout: 'noBorders', widths: [150], table: {
          body: [
            [
              { text: self.texts.label_region, alignment: 'left' },
              { text: self.dados.region.metadata[0].region_display, alignment: 'left', style: 'data' }
            ],
            [
              { text: self.texts.label_area, alignment: 'left' },
              { text: self.decimalPipe.transform(self.dados.region.metadata[0].area_region, '1.2-2') + '  km²', alignment: 'left', style: 'data' }
            ],
            [
              { text: self.texts.label_area_antropica, alignment: 'left' },
              { text: self.decimalPipe.transform(self.dados.region.metadata[0].area_antropica, '1.2-2') + '  km²', alignment: 'left', style: 'data' }
            ]
          ]
        }
      };
      legend.push(table);
      legend.push({
        image: await self.getBase64ImageFromUrl(self.dados.region.legendas.legendRegion),
        width: 120,
        alignment: 'left'
      });
      legend.push({
        image: await self.getBase64ImageFromUrl(self.dados.region.legendas.legendTerraclass),
        width: 130,
        alignment: 'left'
      });

      columns.push(
        [
          {
            image: await self.getBase64ImageFromUrl(self.dados.region.terraclass.imgLarge),
            width: 300,
            margin: 5,
            alignment: 'center'
          },
          { text: this.texts.label_img_mun, alignment: 'center', style: 'data', margin: [0, 3, 0, 10] },
        ],
        legend,
      );
      document.content.push({ columns: columns });
    }

    if (this.dados.graphic) {
      document.content.push({ text: self.texts.label_timeseries, style: 'subheader' });
      document.content.push({ image: await self.canvasToBase64Chart(), width: 490, alignment: 'center', margin: [2, 10, 2, 0] });
    }
    if (self.dados.region.anual_statistic) {
      document.content.push({ text: self.texts.label_images, style: 'subheader' });
      let columnsImages = self.separar(self.dados.region.anual_statistic, 3);

      for (let [index, images] of columnsImages.entries()) {
        let sizeColumns = images.length;
        let imagesLanset = [];
        for (let [index, image] of images.entries()) {
          let marginLeft: number = sizeColumns <= 2 ? 43 : 2;
          let table = {
            alignment: 'center',
            style: 'tableDpatImage', layout: 'noBorders', margin: [marginLeft, 2, 2, 2], width: 'auto', table: {
              body: [],
              alignment: 'center'
            }
          };
          table.table.body.push([
            { text: self.texts.label_statistc_area, alignment: 'left' },
            { text: self.decimalPipe.transform(image.area_region, '1.2-2') + '  km²', alignment: 'left', style: 'data' }
          ]);
          table.table.body.push([
            { text: self.texts.label_statistc_area_prodes, alignment: 'left' },
            { text: self.decimalPipe.transform(image.area_prodes, '1.2-2') + '  km²', alignment: 'left', style: 'data' }
          ]);
          if (image.area_app) {
            table.table.body.push([
              { text: self.texts.label_statistc_app, alignment: 'left' },
              { text: self.decimalPipe.transform(image.area_app, '1.2-2') + '  km²', alignment: 'left', style: 'data' }
            ]);
          }
          if (image.area_app) {
            table.table.body.push([
              { text: self.texts.label_statistc_area_rl, alignment: 'left' },
              { text: self.decimalPipe.transform(image.area_rl, '1.2-2') + '  km²', alignment: 'left', style: 'data' }
            ]);
          }
          imagesLanset.push([
            { text: self.texts.label_year + ' ' + image.year, alignment: 'center', margin: [0, 5, 0, 0] },
            { image: await self.getBase64ImageFromUrl(image.imgSmall), width: 170, alignment: 'center', margin: [2, 2, 2, 0] },
            { image: await self.getBase64ImageFromUrl(self.dados.region.legendas.legendDesmatamento), width: 130, alignment: 'center' },
            table
          ]);
        }
        document.content.push({ columns: imagesLanset });
      }
    }
    if (self.dados.ranking) {
      document.content.push({ text: self.texts.label_municipalities, style: 'subheader', pageBreak: 'before' });
      document.content.push({ text: self.dados.ranking.table.description + ' ' + self.dados.ranking.desmatInfo.Viewvalue, margin: [2, 30, 20, 10], alignment: 'center', style: 'citySummary' });
      let tableCounties = {
        style: 'tableCounty',
        layout: 'headerLineOnly',
        table: {
          headerRows: 1,
          widths: ['*', 200, '*', '*'],
          body: [],
          margin: 10
        }
      };
      tableCounties.table.body.push([
        { text: self.dados.ranking.table.split[0], alignment: 'center' },
        { text: self.dados.ranking.table.split[1], alignment: 'left' },
        { text: self.dados.ranking.table.split[2], alignment: 'center' },
        { text: self.dados.ranking.table.split[3], alignment: 'center' }
      ]);
      for (let [index, city] of self.dados.ranking.table.series.entries()) {
        tableCounties.table.body.push([
          { text: city.index, alignment: 'center' },
          { text: city.name, alignment: 'left' },
          { text: city.uf, alignment: 'center' },
          { text: self.decimalPipe.transform(city.value, '1.2-2') + ' km²', alignment: 'center' }
        ]);
      }
      document.content.push(tableCounties);
    }

    const filename = 'Report - ' + self.dados.region.metadata[0].region_display + '.pdf';

    pdfMake.createPdf(document).download(filename);
    this.loading = false;
  }

  closeDialog() {
    this.dialogRef.close({ event: 'close' });
  }

}
