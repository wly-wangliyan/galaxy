import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartProgressbarComponent } from './chart-progressbar.component';

describe('ChartProgressbarComponent', () => {
  let component: ChartProgressbarComponent;
  let fixture: ComponentFixture<ChartProgressbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartProgressbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
