import { ChangeDetectorRef, Component, OnInit, OnDestroy, Inject, AfterViewInit, HostListener } from '@angular/core';
import { SearchService, MapComponent } from '../map.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from 'ngx-image-video-gallery';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Lightbox } from 'ngx-lightbox';
import { DatePipe, DecimalPipe } from '@angular/common';
import logos from '../../views/logos';
import * as moment from 'moment';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

declare let html2canvas: any;

@Component({
  selector: 'app-map-mobile',
  templateUrl: './map-mobile.component.html',
  providers: [SearchService],
  // styleUrls: ['./map-mobile.component.css']
})
export class MapMobileComponent extends MapComponent implements AfterViewInit {

  indexOpenConsulta: any = 0;

  tabNum = 0;
  selected = 0;
  height: number;

  ngOnInit() {
    super.ngOnInit();
    this.currentZoom = 4.8;
    this.height = window.innerHeight;
    const self = this;

    self.route.paramMap.subscribe(function (params) {
      if (self.router.url.includes('regions')) {
        if (params.keys.includes('token')) {
          self.layerFromConsulta.token = params.get('token');
          self.analyzeUploadShape(true);
        }
      }
    });

    self.route.paramMap.subscribe(function (params) {
      if (self.router.url.includes('plataforma')) {
        if (params.keys.includes('token')) {
          self.openReport(params);
        }
      }
    });

    this.tabNum = 2;
  }

  async searchUploadShape(): Promise<void> {
    super.searchUploadShape();
    this.indexOpenConsulta = 0;
    this.analyzeUploadShape(true)
  }

  ngAfterViewInit(): void {
    const self = this;
    self.route.paramMap.subscribe(function (params) {
      if (self.router.url.includes('regions')) {
        if (params.keys.includes('token')) {
          self.indexOpenConsulta = 2;
        }
      }
    });
  }

  openDialog(): void {
    //  @todo REMOVE
    window.document.body.style.cursor = 'auto';

    this.dataForDialog.language = this.language;
    this.dataForDialog.textosDaDialog = this.textOnDialog;

    let dialogRef = this.dialog.open(DialogMobileLaudo, {
      width: '98%',
      minWidth: '95%',
      panelClass: 'full-width-dialog',
      height: window.innerHeight - 30 + 'px',
      data: this.dataForDialog,
    });
  }

  // @HostListener('swipeleft', ['$event'])
  // swipeLeft( eType ) {
  //   console.log(eType)
  //   if (this.indexOpenConsulta < this.tabNum) {
  //     this.indexOpenConsulta++;
  //   }
  //   console.log(this.indexOpenConsulta);
  // }
  //
  // @HostListener('swiperight', ['$event'])
  // swipeRight( eType ) {
  //   console.log(eType)
  //   if (this.indexOpenConsulta > 0) {
  //     this.indexOpenConsulta--;
  //   }
  // }

}

@Component({
  selector: 'app-map',
  templateUrl: './dialog-laudo-mobile.html',
  // styleUrls: ['./map-mobile.component.css']
})
export class DialogMobileLaudo implements OnInit, OnDestroy {
  indexAccordion = 0;

  images: any[];
  defaultImg = '';
  urlSentinel: Array<{ src: string; caption: string; thumb: string }> = [];
  vetBfast: Array<{ src: string; caption: string; thumb: string }> = [];
  vetSuscept: Array<{ src: string; caption: string; thumb: string }> = [];
  vetCar: Array<{ src: string; caption: string; thumb: string }> = [];
  vetABC: Array<{ src: string; caption: string; thumb: string }> = [];
  vetEspecial: Array<{ id: string; src: string; caption: string; thumb: string }> = [];
  dataBfast: any = {};
  dataSuscept: any = {};
  dataCampo: any = [];
  dataEspecial: any = null;

  infoDesmat: any = {};
  infoVisita: any = {};
  urlsLandSat: any = [];
  dadosValidacao_Amostral: any = {};
  tmpModis: any = [];

  dataTimeseriesModis: any = {};
  optionsTimeSeries: any = {};

  textOnDialog = {} as any;

  carData: any = [];
  abcData: any = [];
  loading: boolean;

  svgLoading: string;

  albumLandsat: Array<{ src: string; caption: string; thumb: string }> = [];

  galleryOptions: NgxGalleryOptions[];
  galleryDrones: NgxGalleryImage[];
  galleryCamera: NgxGalleryImage[];
  galleryVideos: NgxGalleryImage[];

  httpOptions: any;

  constructor(
    public dialogRef: MatDialogRef<DialogMobileLaudo>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient,
    private cdRef: ChangeDetectorRef,
    private _lightbox: Lightbox,
    private decimalPipe: DecimalPipe
  ) {
    this.defaultImg = '';
    this.dataSuscept = {};
    this.dataBfast = {};
    this.urlsLandSat = [];
    this.dataCampo = [];
    this.infoDesmat = {};
    this.infoVisita = {};
    this.dadosValidacao_Amostral = {};
    this.dataTimeseriesModis = {};
    this.textOnDialog = data.textosDaDialog;
    this.tmpModis = [];
    this.loading = false;

    this.dataEspecial = null;

    this.svgLoading = "/assets/img/loading.svg";
    this.initGallery();

    this.httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }


  initGallery() {
    this.galleryDrones = [];
    this.galleryCamera = [];
    this.galleryVideos = [];
  }

  onNoClick(): void {
    this.cdRef.detach();
    this.dialogRef.close();
  }

  private getServiceParams() {
    let params = [];

    if (this.data != undefined) {
      params.push('origin=' + this.data.origin_table.toLowerCase());
      params.push('gid=' + this.data.gid);

      if (this.data.origin_table.toLowerCase() === 'prodes') {
        params.push("year=" + this.data.year);
      }
      else {
        params.push('year=2018');
      }

      params.push('lang=' + this.data.language);

    }

    let urlParams = '?' + params.join('&');

    return urlParams;
  }

  async getBase64ImageFromUrl(imageUrl) {
    var res = await fetch(imageUrl);
    var blob = await res.blob();

    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.addEventListener("load", function () {
        resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  async printReport() {
    let language = this.data.language;
    let self = this;
    this.loading = true;
    let polygonClass = {};

    if (this.infoDesmat.pathclassefip != '1') {
      polygonClass = {
        image: await this.getBase64ImageFromUrl(this.infoDesmat.pathclassefip),
        width: 150,
        margin: [0, 0, 100, 0],
      }
    }

    let dd = {
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
            text: this.textOnDialog.title.toUpperCase(),
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
      content: [
        { text: this.textOnDialog.information_tab.title_tab, style: 'subheader' },
        {
          columns: [
            {
              style: 'tableDpat',
              layout: 'noBorders',
              table: {
                body: [
                  [
                    { text: this.textOnDialog.information_tab.metadados_label.toUpperCase(), alignment: 'left', colSpan: 2 },
                    {},
                  ],
                  [
                    this.textOnDialog.information_tab.polygon_label,
                    { text: this.data.origin_table + '-CERRADO', alignment: 'left', style: 'data' },
                  ],
                  [
                    this.textOnDialog.information_tab.area_label,
                    { text: this.decimalPipe.transform(this.infoDesmat.area, '1.2-3') + ' ' + this.textOnDialog.information_tab.unit_measure, alignment: 'left', style: 'data' },
                  ],
                  [
                    this.textOnDialog.information_tab.municipio_label,
                    { text: this.data.municipio + ' - ' + this.data.uf, alignment: 'left', style: 'data' },
                  ],
                  [
                    this.textOnDialog.information_tab.detection_date_label,
                    { text: this.data.dataFormatada, alignment: 'left', style: 'data' },
                  ],
                  [
                    this.textOnDialog.information_tab.latitude_label,
                    { text: this.decimalPipe.transform(this.infoDesmat.latitude, '1.3-6'), alignment: 'left', style: 'data' },
                  ],
                  [
                    this.textOnDialog.information_tab.longitude_label,
                    { text: this.decimalPipe.transform(this.infoDesmat.longitude, '1.3-6'), alignment: 'left', style: 'data' },
                  ],
                ]
              }
            },
            polygonClass,
          ],
        },
        {
          image: await this.getBase64ImageFromUrl(this.urlSentinel[0].thumb),
          width: 400,
          alignment: 'center'
        },
        { text: this.textOnDialog.information_tab.landsat_image_description + ' ' + this.data.origin_table + '-Cerrado', alignment: 'center', style: 'textImglegend', pageBreak: 'after' },
      ],
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
    }

    if (this.dataEspecial) {
      let columns = [];
      let images = [];

      dd.content.push({ text: this.textOnDialog.especial_area.title_tab, style: 'subheader' });

      if (this.dataEspecial.ti) {

        if (this.dataEspecial.ti.show) {
          images.push(
            {
              image: await self.getBase64ImageFromUrl(self.dataEspecial.ti.thumb),
              width: 180,
              alignment: 'center'
            }
          );

          if (this.dataEspecial.ti.legendDesmatamento) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.ti.legendDesmatamento),
                width: 180,
                alignment: 'center'
              }
            );
          }

          if (this.dataEspecial.ti.legendEspecial) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.ti.legendEspecial),
                width: 180,
                alignment: 'center'
              }
            );
          }

        }

        columns.push(
          [
            { text: this.textOnDialog.especial_area.titleTI, alignment: 'left', margin: [0, 25, 0, 10] },
            { text: this.dataEspecial.ti.ti_nom, alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            { text: this.textOnDialog.especial_area.distancia + ' ' + this.dataEspecial.ti.ti_dist + ' km', alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            // images,
          ],
        );
      }
      if (this.dataEspecial.ucus) {

        if (this.dataEspecial.ucus.show) {
          images.push(
            {
              image: await self.getBase64ImageFromUrl(self.dataEspecial.ucus.thumb),
              width: 180,
              alignment: 'center'
            }
          );

          if (this.dataEspecial.ucus.legendDesmatamento) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.ucus.legendDesmatamento),
                width: 180,
                alignment: 'center'
              }
            );
          }

          if (this.dataEspecial.ucus.legendEspecial) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.ucus.legendEspecial),
                width: 180,
                alignment: 'center'
              }
            );
          }

        }

        columns.push(
          [
            { text: this.textOnDialog.especial_area.titleUCUS, alignment: 'left', margin: [0, 25, 0, 10] },
            { text: this.dataEspecial.ucus.ucus_nom, alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            { text: this.textOnDialog.especial_area.distancia + ' ' + this.dataEspecial.ucus.ucus_dist + ' km', alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            // images,
          ],
        );
      }

      dd.content.push({ columns: columns });
      // @ts-ignore
      dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 2 }] });

      columns = [];
      images = [];
      if (this.dataEspecial.ucpi) {

        if (this.dataEspecial.ucpi.show) {
          images.push(
            {
              image: await self.getBase64ImageFromUrl(self.dataEspecial.ucpi.thumb),
              width: 180,
              alignment: 'center'
            }
          );

          if (this.dataEspecial.ucpi.legendDesmatamento) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.ucpi.legendDesmatamento),
                width: 180,
                alignment: 'center'
              }
            );
          }

          if (this.dataEspecial.ucpi.legendEspecial) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.ucpi.legendEspecial),
                width: 180,
                alignment: 'center'
              }
            );
          }

        }

        columns.push(
          [
            { text: this.textOnDialog.especial_area.titleUCPI, alignment: 'left', margin: [0, 25, 0, 10] },
            { text: this.dataEspecial.ucpi.ucpi_nom, alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            { text: this.textOnDialog.especial_area.distancia + ' ' + this.dataEspecial.ucpi.ucpi_dist + ' km', alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            // images,
          ],
        );
      }
      if (this.dataEspecial.q) {
        if (this.dataEspecial.q.show) {
          images.push(
            {
              image: await self.getBase64ImageFromUrl(self.dataEspecial.q.thumb),
              width: 180,
              alignment: 'center'
            }
          );

          if (this.dataEspecial.q.legendDesmatamento) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.q.legendDesmatamento),
                width: 180,
                alignment: 'center'
              }
            );
          }

          if (this.dataEspecial.q.legendEspecial) {
            images.push(
              {
                image: await self.getBase64ImageFromUrl(self.dataEspecial.q.legendEspecial),
                width: 180,
                alignment: 'center'
              }
            );
          }

        }
        columns.push(
          [
            { text: this.textOnDialog.especial_area.titleQ, alignment: 'left', margin: [0, 25, 0, 10] },
            { text: this.dataEspecial.ucus.q_nom, alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            { text: this.textOnDialog.especial_area.distancia + ' ' + this.dataEspecial.q.q_dist + ' km', alignment: 'left', style: 'data', margin: [0, 1, 0, 0] },
            // images,
          ],
        );
      }

      dd.content.push({ columns: columns });
      // @ts-ignore
      dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 2 }] });
    }

    if (this.carData.length > 0 && this.data.year >= 2013) {
      // @ts-ignore
      dd.content.push({ text: this.textOnDialog.car_tab.title_tab, style: 'subheader', margin: [0, 25, 0, 10] })

      for (const [index, item] of this.carData.entries()) {
        let columns = [];

        let nascente = [];
        let area_rl = [];
        let area_desmat_app = [];

        if (item.metaData.qnt_nascente || item.metaData.qnt_nascente > 0) {
          nascente.push(self.textOnDialog.car_tab.nascente_car_label);
          nascente.push({ text: item.metaData.qnt_nascente, alignment: 'left', style: 'data' });
        } else {
          nascente.push({}, {});
        }
        if (item.metaData.area_rl || item.metaData.area_desmat_rl > 0) {
          area_rl.push(self.textOnDialog.car_tab.display_rl_message[0]);
          area_rl.push({
            text: self.decimalPipe.transform(item.metaData.area_desm, '1.2-3') +
              self.textOnDialog.car_tab.display_rl_message[1] +
              item.metaData.percentRL + this.textOnDialog.car_tab.display_rl_message[2],
            alignment: 'left',
            style: 'data'
          }
          );
        } else {
          area_rl.push({}, {});
        }
        if (item.metaData.area_desmat_app && item.metaData.area_desmat_app > 0) {
          area_desmat_app.push(this.textOnDialog.car_tab.display_app_message[0]);
          area_desmat_app.push({
            text: this.decimalPipe.transform(item.metaData.area_desmat_app, '1.2-3') + ' ' +
              this.textOnDialog.car_tab.display_app_message[1] + ' ' +
              item.metaData.percentAPP + ' ' + this.textOnDialog.car_tab.display_app_message[2],
            alignment: 'left',
            style: 'data'
          }
          );
        } else {
          area_desmat_app.push({}, {});
        }

        let legend = [];

        if (item.imgsCar.legendDesmatamento) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsCar.legendDesmatamento),
              fit: [170, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsCar.legendCar) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsCar.legendCar),
              fit: [102, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsCar.legendAPP) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsCar.legendAPP),
              fit: [170, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsCar.legendRL) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsCar.legendRL),
              fit: [87, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsCar.legendNascente) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsCar.legendNascente),
              fit: [102, 20],
              alignment: 'left'
            }
          );
        }

        if (item.metaData.percentDesmat !== '') {
          legend.push(
            {
              text: self.textOnDialog.car_tab.display_car_description_message[0] +
                self.data.origin_table + ' -CERRADO' +
                self.textOnDialog.car_tab.display_car_description_message[1] +
                item.metaData.percentDesmat +
                self.textOnDialog.car_tab.display_car_description_message[2],
              alignment: 'justify',
              style: 'textObs',
              // [left, top, right, bottom]
              margin: [2, 0, 5, 0],
            },
          );
        }
        // @ts-ignore
        dd.content.push({ text: self.textOnDialog.car_tab.title_info.toUpperCase(), alignment: 'left', margin: [0, 8, 0, 0] });

        // @ts-ignore
        dd.content.push({ text: self.textOnDialog.car_tab.cod_car_label + ' ' + item.metaData.cod_car, alignment: 'left', style: 'codCar', margin: [0, 8, 0, 5] });

        let table = {
          style: 'tableDpat', layout: 'noBorders', widths: [150], table: {
            body: [
              [
                self.textOnDialog.car_tab.area_car_label,
              ],
              [
                { text: self.decimalPipe.transform(item.metaData.area_car, '1.2-3') + '  km²', alignment: 'left', style: 'data' },
              ],
              [
                self.textOnDialog.car_tab.reference_date_car_label,
              ],
              [
                { text: item.metaData.dataRefFormatada, alignment: 'left', style: 'data' },
              ],
              [
                nascente[0],
              ],
              [
                nascente[1],
              ],
              [
                area_rl[0],
              ],
              [
                area_rl[1],
              ],
              [
                area_desmat_app[0]
              ],
              [
                area_desmat_app[1]
              ]
            ]
          }
        };
        columns.push(
          table,
          {
            image: await self.getBase64ImageFromUrl(self.vetCar[index].thumb),
            width: 150,
            margin: 5,
            alignment: 'center'
          },
          legend
        );
        dd.content.push({ columns: columns })
        // @ts-ignore
        dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 2 }] })
      }
    }

    // @ts-ignore
    dd.content.push({ text: this.textOnDialog.historico_amostral_landsat.title_tab, style: 'subheader', pageBreak: this.carData.length > 0 ? "before" : false })

    if (this.dadosValidacao_Amostral.exist) {
      let validacaoLandsat = {
        columns: [
          {
            style: 'tableDpat',
            layout: 'noBorders',
            table: {
              body: [
                [
                  { text: this.textOnDialog.historico_amostral_landsat.amostral_title.toUpperCase(), alignment: 'left', colSpan: 2 },
                  {},
                ],
                [
                  this.textOnDialog.information_tab.polygon_label,
                  { text: this.dadosValidacao_Amostral.finalClass, alignment: 'left', style: 'data' },
                ]
              ]
            }
          },
          [
            {
              image: await this.getBase64ImageFromUrl(this.urlsLandSat.legend),
              width: 150,
            },
            // [left, top, right, bottom]
            { text: this.textOnDialog.historico_amostral_landsat.amostral_classes_legend_label, alignment: 'center', style: 'data', margin: [0, 15, 0, 0], },
          ]
        ]
      };
      dd.content.push(validacaoLandsat)
    }

    let separar = function (base, maximo) {
      var resultado = [[]];
      var grupo = 0;

      for (var indice = 0; indice < base.length; indice++) {
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

    let columnsImages = separar(this.albumLandsat, 3);

    for (let [index, images] of columnsImages.entries()) {
      let imagesLanset = [];
      for (let [index, image] of images.entries()) {
        imagesLanset.push([
          { image: await self.getBase64ImageFromUrl(image.thumb), width: 170, alignment: 'center', margin: [2, 10, 2, 0] },
          { text: image.caption, alignment: 'center', margin: [0, 2, 0, 0] },
        ]);
      }
      dd.content.push({ columns: imagesLanset });
    }

    let canvasToBase64Modis = async function () {
      let canvas = await html2canvas(document.querySelector("#reportChart"));
      return canvas.toDataURL('image/png');
    }

    // @ts-ignore
    dd.content.push({ text: this.textOnDialog.historico_amostral_landsat.series_modis_title, style: 'subheader', margin: [0, 10, 0, 0] })
    // @ts-ignore
    dd.content.push({ image: await canvasToBase64Modis(), width: 520, alignment: 'center', margin: [2, 10, 2, 0] })

    if (this.dataCampo.length > 0) {
      // @ts-ignore
      dd.content.push({ text: this.textOnDialog.campo_tab.title_tab, style: 'subheader', pageBreak: this.albumLandsat.length > 0 ? "before" : false })

      let usocobertura = [];
      let obs = [];

      if (this.infoVisita.usocobertura != ' ') {
        usocobertura.push(this.textOnDialog.campo_tab.field_uso_do_solo_label, this.infoVisita.usocobertura);
      } else {
        usocobertura.push({}, {});
      }

      if (this.infoVisita.obs != ' ') {
        obs.push(this.textOnDialog.campo_tab.field_observation_label, this.infoVisita.obs);
      } else {
        obs.push({}, {});
      }
      let table = {
        style: 'tableDpat',
        layout: 'noBorders',
        table: {
          body: [
            [
              { text: this.textOnDialog.campo_tab.field_data_label.toUpperCase(), alignment: 'left', colSpan: 2 },
              {},
            ],
            [
              this.textOnDialog.campo_tab.field_number_label,
              { text: this.infoVisita.campo, alignment: 'left', style: 'data' },
            ],
            [
              this.textOnDialog.campo_tab.field_visit_date_label,
              { text: this.infoVisita.dataFormatada, alignment: 'left', style: 'data' },
            ],
            [
              this.textOnDialog.information_tab.latitude_label,
              { text: this.infoVisita.latitude, alignment: 'left', style: 'data' },
            ],
            [
              this.textOnDialog.information_tab.longitude_label,
              { text: this.infoVisita.longitude, alignment: 'left', style: 'data' },
            ],
            usocobertura,
            obs
          ]
        }
      };

      // @ts-ignore
      dd.content.push(table);

      if (this.galleryDrones.length > 0) {
        for (const [index, item] of this.galleryDrones.entries()) {
          if (index < 4) {
            // @ts-ignore
            dd.content.push({ image: await self.getBase64ImageFromUrl(item.medium), width: 400, alignment: 'center', margin: [2, 10, 2, 10] });
            // [left, top, right, bottom]
            // @ts-ignore
            // dd.content.push({text:this.textOnDialog.campo_tab.title_drone_photo_tab + ' 0' + index+1, alignment: 'center'});
          }
        }
      } else {
        for (const [index, item] of this.galleryCamera.entries()) {
          if (index < 4) {
            // @ts-ignore
            dd.content.push({ image: await self.getBase64ImageFromUrl(item.medium), width: 400, alignment: 'center', margin: [2, 5, 2, 5] });
            // @ts-ignore
            // dd.content.push({text:this.textOnDialog.campo_tab.title_camera_tab + ' ' + index, alignment: 'center',});
          }
        }
      }

    }

    if (this.data.year > 2015 && this.data.year <= 2019) {
      let columns = [];
      // @ts-ignore
      dd.content.push({ text: this.textOnDialog.analise_automatica.title_tab, style: 'subheader', pageBreak: this.albumLandsat.length > 0 ? "before" : false })
      let legend = [];

      if (this.dataSuscept.legend) {
        legend.push(
          {
            image: await self.getBase64ImageFromUrl(self.dataSuscept.legend),
            width: 100,
            margin: 5,
            alignment: 'left'
          },
        );
      }

      legend.push({ text: this.textOnDialog.analise_automatica.info_susceptibility_faixas, alignment: 'justify', style: 'data', margin: [0, 10, 15, 0] });

      if (this.dataSuscept.prob_suscept != null) {
        legend.push(
          {
            text: this.textOnDialog.analise_automatica.info_susceptibility_description_split[0] +
              this.dataSuscept.type +
              this.textOnDialog.analise_automatica.info_susceptibility_description_split[1] +
              this.dataSuscept.sucept_desmatFormatada + '.',
            alignment: 'justify',
            margin: [0, 10, 15, 0],
            style: 'data'
          }
        );
      }

      columns.push(
        legend,
        {
          image: await self.getBase64ImageFromUrl(self.vetSuscept[0].thumb),
          width: 300,
          margin: 5,
          alignment: 'center'
        }
      );

      dd.content.push({ columns: columns })
    };

    if (this.dataBfast.pct_bfast != null && this.dataBfast.pct_bfast > 0) {
      let columns = [];
      // @ts-ignore
      dd.content.push({ text: this.textOnDialog.analise_automatica.title_info_bfast, style: 'subheader' })
      let legend = [];

      if (this.dataBfast.legend) {
        legend.push(
          {
            image: await self.getBase64ImageFromUrl(self.dataBfast.legend),
            width: 100,
            margin: 5,
            alignment: 'left'
          },
        );
      }

      legend.push({ text: this.textOnDialog.analise_automatica.info_bfast_faixas, alignment: 'justify', style: 'data', margin: [0, 10, 15, 0], });
      legend.push(
        {
          text: this.textOnDialog.analise_automatica.info_bfast_description +
            this.dataBfast.prob_Formatada,
          alignment: 'justify',
          margin: [0, 10, 15, 0],
          style: 'data'
        }
      );

      columns.push(
        legend,
        {
          image: await self.getBase64ImageFromUrl(self.vetBfast[0].thumb),
          width: 300,
          margin: 5,
          alignment: 'center'
        }
      );

      dd.content.push({ columns: columns })
    };

    if (this.abcData.length > 0) {
      // @ts-ignore
      dd.content.push({ text: this.textOnDialog.fip_abc_tab.title_tab, style: 'subheader', pageBreak: "before" })

      for (const [index, item] of this.abcData.entries()) {
        let columns = [];

        let area_tecnologia = [];
        let tec_impl = [];

        if (item.metaData.area_tecnologia > 0) {
          area_tecnologia.push(this.textOnDialog.fip_abc_tab.property_area_tec_label);
          area_tecnologia.push({ text: self.decimalPipe.transform(item.metaData.area_tecnologia, '1.2-3') + '  km²', alignment: 'left', style: 'data' });
        } else {
          area_tecnologia.push({}, {});
        }

        if (item.metaData.tec_impl != null) {
          tec_impl.push(this.textOnDialog.fip_abc_tab.property_applied_tec_label);
          tec_impl.push({ text: item.metaData.tec_impl, alignment: 'left', style: 'data' });
          tec_impl.push(this.textOnDialog.fip_abc_tab.property_area_deforested_label);
          tec_impl.push({ text: self.decimalPipe.transform(item.metaData.area_desmatada, '1.2-3') + '  km²', alignment: 'left', style: 'data' });
        } else {
          tec_impl.push({}, {}, {}, {});
        }
        let legend = [];

        if (item.imgsProp.legendProp) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsProp.legendProp),
              fit: [150, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsProp.legendExp) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsProp.legendExp),
              fit: [150, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsProp.legendTec) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsProp.legendTec),
              fit: [150, 20],
              alignment: 'left'
            }
          );
        }

        if (item.imgsProp.legendDesmatamento) {
          legend.push(
            {
              image: await self.getBase64ImageFromUrl(item.imgsProp.legendDesmatamento),
              fit: [150, 20],
              alignment: 'left'
            }
          );
        }

        let table = {
          style: 'tableDpat', layout: 'noBorders', widths: [150], table: {
            body: [
              [
                { text: this.textOnDialog.fip_abc_tab.title_info.toUpperCase(), alignment: 'left', style: 'data', margin: [0, 10, 0, 10] },
              ],
              [
                this.textOnDialog.fip_abc_tab.property_area_label
              ],
              [
                { text: self.decimalPipe.transform(item.metaData.area_propriedade, '1.2-3') + '  km²', alignment: 'left', style: 'data' },
              ],
              [
                this.textOnDialog.fip_abc_tab.property_area_explored_label
              ],
              [
                { text: self.decimalPipe.transform(item.metaData.area_explorada, '1.2-3') + '  km²', alignment: 'left', style: 'data' },
              ],
              [
                area_tecnologia[0],
              ],
              [
                area_tecnologia[1],
              ],
              [
                tec_impl[0],
              ],
              [
                tec_impl[1]
              ],
              [
                tec_impl[2]
              ],
              [
                tec_impl[3]
              ]
            ]
          }
        };
        columns.push(
          table,
          {
            image: await self.getBase64ImageFromUrl(this.vetABC[index].thumb),
            width: 150,
            margin: 5,
            alignment: 'center'
          },
          legend
        );
        dd.content.push({ columns: columns })
        // @ts-ignore
        dd.content.push({ canvas: [{ type: 'line', x1: 0, y1: 5, x2: 595 - 2 * 40, y2: 5, lineWidth: 2 }] })
      }
    }

    let dados = {
      token: new Date().getTime(),
      params: this.data
    }
    this.http.post('/service/report/store', JSON.stringify(dados, null, 2), this.httpOptions).subscribe(result => {
      if (Array.isArray(result)) {
        // @ts-ignore
        dd.content.push({ text: this.textOnDialog.information_tab.info_qrcode, alignment: 'center', style: 'textFooter', margin: [190, 80, 190, 10], pageBreak: false });
        // @ts-ignore
        dd.content.push({ qr: 'https://www.cerradodpat.org/#/plataforma/' + result[0].token, fit: '150', alignment: 'center' });
        // @ts-ignore
        dd.content.push({ text: 'https://www.cerradodpat.org/#/plataforma/' + result[0].token, alignment: 'center', style: 'textFooter' });
        let filename = this.textOnDialog.title.toLowerCase() + ' - ' + result[0].token + '.pdf'
        pdfMake.createPdf(dd).download(filename);
      }
    }, (err) => {
      console.error('Não foi possível cadastrar cadastrar a requisição do relatório')
      this.loading = false;
    });
    this.loading = false;
  }

  ngOnInit() {

    let fieldPhotosUrl = '/service/report/field/' + this.getServiceParams();

    this.http.get(fieldPhotosUrl).subscribe(
      result => {

        this.infoDesmat = result['info'];

        if (this.infoDesmat.classefip == null) {
          this.infoDesmat.pathclassefip = '1';
        } else {
          this.infoDesmat.pathclassefip = '/assets/metric/classe' + this.infoDesmat.classefip + '_' + this.data.language + '.png'
        }

        this.carData = result['car'];
        this.carData.show = result['car'].show;

        this.carData.forEach(element => {

          element.metaData.dataRefFormatada = element.metaData.dataRef == '' ? this.textOnDialog.car_tab.undisclosed_message_car : this.data.datePipe.transform(new Date(element.metaData.dataRef), 'dd/MM/yyyy');
          // element.metaData.area_car = element.metaData.area_car / 100.0  //converte HA to Km2
          element.metaData.percentDesmat = '' + (((element.metaData.area_desmatada / element.metaData.area_car) * 100).toFixed(2) + '%').replace('.', ',');
          element.metaData.percentRL = '' + (((element.metaData.area_desmat_rl / element.metaData.area_reserva_legal_total) * 100).toFixed(2) + '%').replace('.', ',');
          element.metaData.percentAPP = '' + (((element.metaData.area_desmat_app / element.metaData.area_app_total) * 100).toFixed(2) + '%').replace('.', ',');

          this.textOnDialog.car_tab.display_rl_message = this.textOnDialog.car_tab.rl_car_label.split('?');
          this.textOnDialog.car_tab.display_app_message = this.textOnDialog.car_tab.app_car_label.split('?');
          this.textOnDialog.car_tab.display_car_description_message = this.textOnDialog.car_tab.deforestation_car_description.split('?');
          // this.textOnDialog.car_tab.display_rl_message = temp[0] + element.metaData.area_desmat_rl + temp[1] + element.metaData.percentRL + temp[2]

          let dcar = {
            src: element.imgsCar.src,
            caption: 'CAR: ' + element.metaData.cod_car,
            thumb: element.imgsCar.thumb
          };
          this.vetCar.push(dcar);

        });


        this.abcData = result['ABC'];

        this.abcData.forEach(element => {

          let dcar = {
            src: element.imgsProp.src,
            caption: 'ID: ' + element.metaData.chaveID,
            thumb: element.imgsProp.thumb
          };
          this.vetABC.push(dcar);

          if (element.metaData.tec_impl != '') {

            for (const m of this.data.mapForABC) {
              if (m[0] === element.metaData.tec_impl) {
                if (this.data.language === 'pt-br') {
                  element.metaData.tec_impl = m[1]['pt-br'];
                }
                else {
                  element.metaData.tec_impl = m[1]['en-us'];
                }
              }
            }
          }

          if (element.metaData.producao != '') {

            for (const m of this.data.mapForProducao) {
              if (m[0] === element.metaData.producao) {
                if (this.data.language === 'pt-br') {
                  element.metaData.producao = m[1]['pt-br'];
                }
                else {
                  element.metaData.producao = m[1]['en-us'];
                }
              }
            }
          }

        });

        this.dataEspecial = result['especial'];

        if (this.dataEspecial == null || this.dataEspecial == undefined) {
          this.dataEspecial = null
        } else {
          let msg = this.textOnDialog.especial_area.meiodistancia.split("?")

          if (this.dataEspecial.ti.show) {
            this.vetEspecial.push({
              id: 'ti',
              src: this.dataEspecial.ti.src,
              thumb: this.dataEspecial.ti.thumb,
              caption: this.dataEspecial.ti.ti_nom + ", " + msg[0] + " " + this.dataEspecial.ti.ti_dist + msg[1]
            });
          }

          if (this.dataEspecial.ucus.show) {

            this.vetEspecial.push({
              id: 'ucus',
              src: this.dataEspecial.ucus.src,
              thumb: this.dataEspecial.ucus.thumb,
              caption: this.dataEspecial.ucus.ucus_nom + ", " + msg[0] + " " + this.dataEspecial.ucus.ucus_dist + msg[1]
            });
          }

          if (this.dataEspecial.ucpi.show) {
            this.vetEspecial.push({
              id: 'ucpi',
              src: this.dataEspecial.ucpi.src,
              thumb: this.dataEspecial.ucpi.thumb,
              caption: this.dataEspecial.ucpi.ucpi_nom + ", " + msg[0] + " " + this.dataEspecial.ucpi.ucpi_dist + msg[1]
            });
          }

          if (this.dataEspecial.q.show) {
            this.vetEspecial.push({
              id: 'q',
              src: this.dataEspecial.q.src,
              thumb: this.dataEspecial.q.thumb,
              caption: this.dataEspecial.q.q_nom + ", " + msg[0] + " " + this.dataEspecial.q.q_dist + msg[1]
            });
          }
          console.log(this.vetEspecial)

          // if (this.dataEspecial.ap.show) {
          // this.vetEspecial.push({
          //   src: this.dataEspecial.ap.src,
          //   thumb: this.dataEspecial.ap.thumb,
          //   caption: this.dataEspecial.ap.ap_nom + ", " + msg[0] + " " + this.dataEspecial.ap.ap_dist + msg[1]
          // });
          // }


        }


        let sent = {
          src: result['images'].urlSentinel.src,
          caption: 'LandSat ' + this.data.year,
          thumb: result['images'].urlSentinel.thumb
        };
        this.urlSentinel.push(sent);

        this.dataCampo = result['ponto_campo'];

        this.urlsLandSat = result['images'].urlsLandSat;

        for (let i = 0; i < this.urlsLandSat.urlsLandsatMontadas.length; i++) {
          let album = {
            src: this.urlsLandSat.urlsLandsatMontadas[i].url,
            caption: this.textOnDialog.historico_amostral_landsat.caption + this.urlsLandSat.urlsLandsatMontadas[i].year,
            thumb: this.urlsLandSat.urlsLandsatMontadas[i].thumb
          };

          this.albumLandsat.push(album);
        }

        this.dadosValidacao_Amostral = result['images'].urlsLandSat.dadosAmostrais;

        this.dataBfast = result['images'].urlBfast;
        this.dataBfast.prob_Formatada = this.dataBfast.pct_bfast == null ? this.textOnDialog.analise_automatica.not_computed : ('' + this.dataBfast.pct_bfast.toFixed(2) + '%').replace('.', ',');

        let dfast = {
          src: this.dataBfast.urlBfast.src,
          caption: this.dataBfast.prob_Formatada + this.textOnDialog.analise_automatica.caption_bfast,
          thumb: this.dataBfast.urlBfast.thumb
        };
        this.vetBfast.push(dfast);

        this.dataSuscept = result['images'].suscept;

        this.textOnDialog.analise_automatica.info_susceptibility_description_split = this.textOnDialog.analise_automatica.info_susceptibility_description.split('?');
        this.dataSuscept.sucept_desmatFormatada = this.dataSuscept.prob_suscept == null ? this.textOnDialog.analise_automatica.not_computed : ('' + (this.dataSuscept.prob_suscept * 100).toFixed(2) + '%').replace('.', ',');
        let dsuscept = {
          src: this.dataSuscept.urlSuscept.src,
          caption: this.textOnDialog.analise_automatica.caption_suscept + this.dataSuscept.sucept_desmatFormatada,
          thumb: this.dataSuscept.urlSuscept.thumb
        };
        this.vetSuscept.push(dsuscept);
      },
      err => {
        console.log('Error: ', err);
      },
      () => {
        // <---- chamada ao finalizar o subscribe.
        this.galleryOptions = [
          {
            width: '100%',
            height: '500px',
            thumbnailsColumns: 4,
            imageAnimation: NgxGalleryAnimation.Slide,
            imageDescription: true,
            previewCloseOnClick: true,
            previewCloseOnEsc: true,
            thumbnailsMoveSize: 4
            // thumbnailsRemainingCount: true
          },
          // max-width 800
          {
            breakpoint: 800,
            width: '100%',
            height: '700px',
            imagePercent: 100,
            thumbnailsPercent: 20,
            thumbnailsMargin: 20,
            thumbnailMargin: 20
          },
          {
            breakpoint: 400,
            preview: false
          }
        ];

        for (let index = 0; index < this.dataCampo.length; index++) {
          let element = this.dataCampo[index];

          this.infoVisita = element;

          this.infoVisita.dataFormatada = this.infoVisita.data_visita == '' ? this.textOnDialog.campo_tab.caption_undisclosed : this.infoVisita.data_visita;


          for (let foto = 0; foto < element.fotos_camera.length; foto++) {
            this.galleryCamera.push({
              small: '/service/report/field/fotos_camera/' + element.campo_id + '/' + element.fotos_camera[foto],
              medium: '/service/report/field/fotos_camera/' + element.campo_id + '/' + element.fotos_camera[foto],
              big: '/service/report/field/fotos_camera/' + element.campo_id + '/' + element.fotos_camera[foto],
            });
          }


          for (let foto = 0; foto < element.fotos_drone.length; foto++) {
            this.galleryDrones.push({
              small: '/service/report/field/fotos_drone/' + element.campo_id + '/' + element.fotos_drone[foto],
              medium: '/service/report/field/fotos_drone/' + element.campo_id + '/' + element.fotos_drone[foto],
              big: '/service/report/field/fotos_drone/' + element.campo_id + '/' + element.fotos_drone[foto]
            });
          }

          for (let video = 0; video < element.videos_drone.length; video++) {
            this.galleryVideos.push({
              small: '/service/report/field/videos_drone/' + element.campo_id + '/' + element.videos_drone[video],
              medium: '/service/report/field/videos_drone/' + element.campo_id + '/' + element.videos_drone[video],
              big: '/service/report/field/videos_drone/' + element.campo_id + '/' + element.videos_drone[video]
            });
          }
        }
      }
    );


    //  @todo REMOVE
    let ndvi_time_series = '/service/deforestation/modis?table=' + this.data.origin_table + '&gid=' + this.data.gid;
    this.http.get(ndvi_time_series).subscribe(
      result => {
        this.tmpModis = result;
      },
      err => {
        console.log('Error: ', err);
      },
      () => {

        this.dataTimeseriesModis = {
          labels: this.tmpModis.map(element => element.date),
          datasets: [
            // {
            //   label: 'NDVI',
            //   data: this.tmpModis.map(element => element.ndvi_original.toFixed(4)),
            //   fill: false,
            //   borderColor: '#ff0003',
            //   backgroundColor: '#ff0003',
            //   pointRadius: 1,
            //   pointStyle: 'rect',
            //   pointHoverRadius: 3
            // },
            // {
            //   label: 'NDVI-Wiener',
            //   data: this.tmpModis.map(element => element.ndvi_wiener.toFixed(4)),
            //   fill: false,
            //   borderColor: '#208f0a',
            //   backgroundColor: '#208f0a',
            //   hidden: true,
            //   pointRadius: 1,
            //   pointStyle: 'rect',
            //   pointHoverRadius: 3
            // },
            {
              label: 'NDVI',
              data: this.tmpModis.map(element => element.ndvi_golay.toFixed(4)),
              fill: false,
              borderColor: '#0007db',
              backgroundColor: '#0007db',
              hidden: false,
              pointRadius: 1,
              pointHoverRadius: 3,
              pointStyle: 'rect'
            }
          ],
          type: 'line'

        };

        // graphic.options.legend.onHover = function (event) {
        //   event.target.style.cursor = 'pointer';
        //   graphic.options.legend.labels.fontColor = "#0335fc";
        // }

        // graphic.options.legend.onLeave = function (event) {

        //   event.target.style.cursor = 'default';
        //   graphic.options.legend.labels.fontColor = "#fa1d00";
        // }

        this.optionsTimeSeries = {
          tooltips: {
            mode: 'index',
            intersect: true,
          },
          maintainAspectRatio: false,
          resposive: true,
          radius: 1,
          scales: {
            yAxes: [{
              ticks: {
                autoSkip: true,
                stepSize: 0.2
              }
            }],
            xAxes: [{
              type: 'time',
              ticks: {
                autoSkip: true
              }
            }]
          },
          title: {
            display: false,
            fontSize: 16
          },
          legend: {
            labels: {
              usePointStyle: true,
              fontSize: 16
            },
            onHover(event) {
              event.target.style.cursor = 'pointer';
            },
            onLeave(event) {
              event.target.style.cursor = 'default';
            },
            position: 'bottom'
          }
        };



      }
    );
  }

  ngOnDestroy() {
    this.cdRef.detach();
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.cdRef.detectChanges();
  }

  openImage(index: number): void {
    this._lightbox.open(this.albumLandsat, index);
  }

  closeImage(): void {
    this._lightbox.close();
  }

  openLightboxSentinel(): void {
    this._lightbox.open(this.urlSentinel);
  }

  openLightboxSuscept(): void {
    this._lightbox.open(this.vetSuscept);
  }

  openLightboxBfast(): void {
    this._lightbox.open(this.vetBfast);
  }
  openLightboxCAR(index: number): void {
    this._lightbox.open(this.vetCar, index);
  }

  openLightboxABC(index: number): void {
    this._lightbox.open(this.vetABC, index);
  }

  openLightboxEspecial(index: string): void {

    let pos = 0;
    for (let i = 0; i < this.vetEspecial.length; i++) {
      if (this.vetEspecial[i].id.toUpperCase() == index.toUpperCase()) {
        pos = i;
      }
    }

    this._lightbox.open(this.vetEspecial, pos);
  }


}
