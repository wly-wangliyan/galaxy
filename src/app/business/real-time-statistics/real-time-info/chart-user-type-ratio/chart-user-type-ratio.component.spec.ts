import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartUserTypeRatioComponent } from './chart-user-type-ratio.component';

describe('ChartUserTypeRatioComponent', () => {
  let component: ChartUserTypeRatioComponent;
  let fixture: ComponentFixture<ChartUserTypeRatioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartUserTypeRatioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartUserTypeRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
