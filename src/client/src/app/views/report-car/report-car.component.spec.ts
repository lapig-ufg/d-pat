import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportCarComponent } from './report-car.component';

describe('ReportCarComponent', () => {
  let component: ReportCarComponent;
  let fixture: ComponentFixture<ReportCarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportCarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportCarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
