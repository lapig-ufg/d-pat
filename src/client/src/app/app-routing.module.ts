import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MapComponent } from './views/map.component';
import { HotsiteComponent } from './views/hotsite/hotsite.component';

const routes: Routes = [
  /* ROTA RAIZ */
  // { path: '', redirectTo: '/hotsite', pathMatch: 'full' },
  { path: '', component: HotsiteComponent },
  { path: 'plataforma', component: MapComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
