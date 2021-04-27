import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBorder2Component } from './full-border2.component';

describe('FullBorder2Component', () => {
  let component: FullBorder2Component;
  let fixture: ComponentFixture<FullBorder2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullBorder2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullBorder2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
