import { Component, OnInit, Inject, HostListener } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {
  windowScrolled:boolean = false;
  constructor() { }

  ngOnInit() {
  }

  @HostListener("click", ["$event"])
  goToSection(id){
    try {
      event.stopPropagation();
      let el = document.querySelector('#' + id).scrollIntoView({ behavior: 'smooth', block: 'nearest'});
    } catch (e) { }
  }

}
