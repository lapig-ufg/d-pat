import { Component, OnInit, Inject, HostListener, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})

export class ProjectComponent implements OnInit, OnDestroy {
  lang: string;
  constructor(public translate: TranslateService) {
    translate.addLangs(['en', 'pt-br']);
    translate.setDefaultLang('en');
    let browserLang = translate.getBrowserLang();
    // browserLang = browserLang === 'en' ? 'en-us' : browserLang;
    // browserLang = browserLang === 'pt' ? 'pt-br' : browserLang;
    this.lang = browserLang;
    translate.use(browserLang.match(/en|pt-br/) ? browserLang : 'en');
  }

  ngOnInit() {
    document.body.style.overflow = 'auto';
  }

  ngOnDestroy() {
    document.body.style.overflow = 'hidden';
  }

  setLang(lang) {
    this.translate.use(lang);
    this.lang = lang;
  }

  @HostListener("click", ["$event"])
  goToSection(id) {
    try {
      let el = document.querySelector('#' + id).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (e) { }
  }

}
