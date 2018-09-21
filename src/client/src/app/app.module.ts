import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { UiSwitchModule } from 'ngx-ui-switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule, MatSliderModule, MatSelectModule, MatButtonModule, MatTabsModule, MatIconModule, MatRadioModule } from '@angular/material';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { Ng5SliderModule } from 'ng5-slider';

registerLocaleData(localePt);

const appRoutes: Routes = [
  {
    path: 'map',
    component: MapComponent,
    data: { title: 'Book List' }
  },
  { path: '',
    redirectTo: '/map',
    pathMatch: 'full'
  }
];

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    AppNavbarComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    UiSwitchModule.forRoot({
      size: 'small',
      checkedLabel: 'on',
      uncheckedLabel: 'off'
    }),
    BrowserAnimationsModule,
    FormsModule,
    NgxChartsModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatTabsModule,
    MatSliderModule,
    Ng5SliderModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    NgbModule.forRoot()
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
