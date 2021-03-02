import { Component, OnInit, Inject, HostListener, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-capacitacao',
  templateUrl: './capacitacao.component.html'
})

export class CapacitacaoComponent implements OnInit, OnDestroy {
  lang: string;
  languages: any = {};
  constructor(public translate: TranslateService) {
    this.languages['pt'] = 'pt-br';
    this.languages['en'] = 'en';
    this.languages['pt-br'] = 'pt-br';
    this.languages['en-us'] = 'en';

    translate.addLangs(['en', 'pt']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|pt/) ?  this.languages[browserLang] : 'en');
    this.lang = this.languages[browserLang];
  }

  ngOnInit() {
    document.body.style.overflow = 'auto';
  }

  ngOnDestroy() {
    document.body.style.overflow = 'hidden';
  }

  setLang(lang) {
    this.translate.use(this.languages[lang]);
    this.lang = lang;
  }

  @HostListener("click", ["$event"])
  goToSection(id) {
    try {
      let el = document.querySelector('#' + id).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) { }
  }

}
