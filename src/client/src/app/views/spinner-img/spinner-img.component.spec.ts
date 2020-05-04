import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerImgComponent } from './spinner-img.component';

describe('SpinnerImgComponent', () => {
  let component: SpinnerImgComponent;
  let fixture: ComponentFixture<SpinnerImgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerImgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerImgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
