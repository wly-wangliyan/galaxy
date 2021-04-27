import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCounter2Component } from './full-counter2.component';

describe('FullCounter2Component', () => {
  let component: FullCounter2Component;
  let fixture: ComponentFixture<FullCounter2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullCounter2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullCounter2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
