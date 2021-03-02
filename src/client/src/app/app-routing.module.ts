import { NgModule } from '@angular/core';
import { Routes, RouterModule, Router, NavigationEnd } from '@angular/router';
import { MapComponent } from './views/map.component';
import { MapMobileComponent } from './views/map-mobile/map-mobile.component';
import { HotsiteComponent } from './views/hotsite/hotsite.component';
import { MobileComponent } from './views/mobile/mobile.component';
import { ProjectComponent } from './views/project/project.component';
import { CapacitacaoComponent } from './views/capacitacao/capacitacao.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';


declare let gtag: Function;

const routes: Routes = [
  /* ROTA RAIZ */
  // { path: '', redirectTo: '/hotsite', pathMatch: 'full' },
  { path: '', component: HotsiteComponent },
  { path: 'plataforma', component: MapComponent },
  { path: 'projeto', component: ProjectComponent },
  { path: 'capacitacao', component: CapacitacaoComponent },
  { path: 'plataforma/:token', component: MapComponent },
  { path: 'regions/:token', component: MapComponent },
  { path: '**', redirectTo: '/'}
]

const routesMobile: Routes = [
  { path: '', component: MobileComponent },
  { path: 'mobile', component: MobileComponent },
  { path: 'projeto', component: ProjectComponent },
  { path: 'capacitacao', component: CapacitacaoComponent },
  { path: 'map-mobile', component: MapMobileComponent },
  { path: 'plataforma/:token', component: MapMobileComponent },
  { path: 'regions/:token', component: MapMobileComponent},
  { path: '**', redirectTo: '/'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {

  constructor(public router: Router) {

    if (window.innerWidth < 1025) {
      router.resetConfig(routesMobile);
    }

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'UA-168214071-1',
          {
            'page_path': event.urlAfterRedirects
          }
        );
      }
    }
    )
  }

}
