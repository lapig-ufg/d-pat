import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionReportComponent } from './region-report.component';

describe('RegionReportComponent', () => {
  let component: RegionReportComponent;
  let fixture: ComponentFixture<RegionReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
