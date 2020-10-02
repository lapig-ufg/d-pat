import { Component, OnInit, Inject, HostListener, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})

export class ProjectComponent implements OnInit, OnDestroy {
  lang: string;
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'pt']);
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    browserLang = browserLang === 'en' ? 'en-us' : browserLang;
    browserLang = browserLang === 'pt' ? 'pt-br' : browserLang;
    translate.use(browserLang.match(/en|pt/) ? browserLang : 'en');
    this.lang = browserLang;
  }

  ngOnInit() {
    document.body.style.overflow = 'auto';
  }

  ngOnDestroy() {
    document.body.style.overflow = 'hidden';
  }

  setLang(lang) {
    let language = lang === 'en-us' ? 'en' : lang;
    this.translate.use(language);
    this.lang = lang;
  }

  @HostListener("click", ["$event"])
  goToSection(id) {
    try {
      let el = document.querySelector('#' + id).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) { }
  }

}
