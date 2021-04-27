import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartFullScreenComponent } from './chart-full-screen.component';

describe('ChartFullScreenComponent', () => {
  let component: ChartFullScreenComponent;
  let fixture: ComponentFixture<ChartFullScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartFullScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
