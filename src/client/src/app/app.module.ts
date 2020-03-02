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

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
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


import { DropdownModule } from 'primeng/dropdown';

import { HttpClientModule } from '@angular/common/http';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

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
import { NgxFlagPickerModule } from 'ngx-flag-picker';

registerLocaleData(localePt);

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    DialogOverviewExampleDialog,
    SpinnerImgComponent,
    FileUploadComponent
  ],
  imports: [
    TabViewModule,
    TooltipModule,
    DropdownModule,
    NgxFlagPickerModule,
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
    MatRadioModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  entryComponents:[MapComponent, DialogOverviewExampleDialog],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' },
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
