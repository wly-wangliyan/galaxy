import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineRateComponent } from './online-rate.component';

describe('OnlineRateComponent', () => {
  let component: OnlineRateComponent;
  let fixture: ComponentFixture<OnlineRateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineRateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineRateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
