import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMap2Component } from './full-map2.component';

describe('FullMap2Component', () => {
  let component: FullMap2Component;
  let fixture: ComponentFixture<FullMap2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMap2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMap2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
