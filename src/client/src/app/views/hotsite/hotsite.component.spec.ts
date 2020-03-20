import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotsiteComponent } from './hotsite.component';

describe('HotsiteComponent', () => {
  let component: HotsiteComponent;
  let fixture: ComponentFixture<HotsiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotsiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotsiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
