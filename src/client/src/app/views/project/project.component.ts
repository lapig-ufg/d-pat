import { Component, OnInit, Inject, HostListener } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})

export class ProjectComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

  @HostListener("click", ["$event"])
  goToSection(id){
    try {
      let el = document.querySelector('#' + id).scrollIntoView({ behavior: 'smooth', block: 'nearest'});
    } catch (e) { }
  }

}
