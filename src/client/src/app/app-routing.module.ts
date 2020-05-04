import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './views/map.component';
import { HotsiteComponent } from './views/hotsite/hotsite.component';
import { MobileComponent } from './views/mobile/mobile.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


const routes: Routes = [
  /* ROTA RAIZ */
  // { path: '', redirectTo: '/hotsite', pathMatch: 'full' },
  { path: '', component: HotsiteComponent },
  { path: 'plataforma', component: MapComponent },
  { path: 'mobile', component: MobileComponent},
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
