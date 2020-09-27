import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapMobileComponent } from './map-mobile.component';

describe('MapMobileComponent', () => {
  let component: MapMobileComponent;
  let fixture: ComponentFixture<MapMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
