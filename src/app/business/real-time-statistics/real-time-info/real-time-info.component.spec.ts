import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RealTimeInfoComponent } from './real-time-info.component';

describe('RealTimeInfoComponent', () => {
  let component: RealTimeInfoComponent;
  let fixture: ComponentFixture<RealTimeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RealTimeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RealTimeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
