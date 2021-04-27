import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTurnoverRate2Component } from './full-turnover-rate2.component';

describe('FullTurnoverRate2Component', () => {
  let component: FullTurnoverRate2Component;
  let fixture: ComponentFixture<FullTurnoverRate2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullTurnoverRate2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullTurnoverRate2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
