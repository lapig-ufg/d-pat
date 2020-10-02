import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from "@angular/material";

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MapComponent } from './views/map.component';
import { DialogOverviewExampleDialog } from './views/map.component';
import { DialogMobileLaudo } from './views/map-mobile/map-mobile.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatExpansionModule} from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientModule } from '@angular/common/http';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData, DecimalPipe } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { FieldsetModule } from 'primeng/fieldset';
import { PanelModule } from 'primeng/panel';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { TooltipModule } from 'primeng/tooltip';
import { LightboxModule } from 'ngx-lightbox';
import { NgxGalleryModule } from 'ngx-image-video-gallery';
import { CardModule } from 'primeng/card';
import { AccordionModule } from 'primeng/accordion';
import { DatePipe } from '@angular/common';
import { SpinnerImgComponent } from './views/spinner-img/spinner-img.component';
import { FileUploadComponent } from './views/file-upload/file-upload.component';
import { MetadataComponent } from './views/metadata/metadata.component';
import { HotsiteComponent } from './views/hotsite/hotsite.component';
import { GoogleAnalyticsService } from  './services/google-analytics.service'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoCacheHeadersInterceptor } from './interceptors/no-cache-headers-interceptor.interceptor';

import { APP_BASE_HREF } from '@angular/common';
import { MobileComponent } from './views/mobile/mobile.component';
import { ProjectComponent } from './views/project/project.component';
import { MapMobileComponent } from './views/map-mobile/map-mobile.component';
import { RegionReportComponent } from './views/region-report/region-report.component';
import { ReportCarComponent } from './views/report-car/report-car.component';
import { RegionReportMobileComponent } from './views/region-report-mobile/region-report-mobile.component';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DialogOverviewExampleDialog,
    DialogMobileLaudo,
    SpinnerImgComponent,
    FileUploadComponent,
    MetadataComponent,
    HotsiteComponent,
    MobileComponent,
    ProjectComponent,
    MapMobileComponent,
    RegionReportComponent,
    ReportCarComponent,
    RegionReportMobileComponent
  ],
  imports: [
    TabViewModule,
    TooltipModule,
    DropdownModule,
    NgxGalleryModule,
    FieldsetModule,
    CardModule,
    LightboxModule,
    ScrollPanelModule,
    PanelModule,
    AccordionModule,
    TableModule,
    ChartModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    MatTabsModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatCheckboxModule,
    MatSelectModule,
    MatCardModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatSidenavModule,
    MatTooltipModule,
    MatRadioModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    NgbModule
  ],
  entryComponents:[DialogOverviewExampleDialog, MetadataComponent, HotsiteComponent, MapComponent, ProjectComponent, MobileComponent, MapMobileComponent, RegionReportComponent, DialogMobileLaudo, ReportCarComponent, RegionReportMobileComponent],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    DatePipe,
    DecimalPipe,
    GoogleAnalyticsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NoCacheHeadersInterceptor,
      multi: true
    },
  ],
  bootstrap: [AppComponent],


})
export class AppModule {
}
