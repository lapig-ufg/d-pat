import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegionReportMobileComponent } from './region-report-mobile.component';

describe('RegionReportMobileComponent', () => {
  let component: RegionReportMobileComponent;
  let fixture: ComponentFixture<RegionReportMobileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegionReportMobileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegionReportMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
