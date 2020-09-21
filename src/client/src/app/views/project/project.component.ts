import {Component, OnInit, Inject, HostListener, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html'
})

export class ProjectComponent implements OnInit, OnDestroy {
  constructor() { }

  ngOnInit() {
    document.body.style.overflow = 'auto';
  }

  ngOnDestroy() {
    document.body.style.overflow = 'hidden';
  }

  @HostListener("click", ["$event"])
  goToSection(id){
    try {
      let el = document.querySelector('#' + id).scrollIntoView({ behavior: 'smooth', block: 'nearest'});
    } catch (e) { }
  }

}
