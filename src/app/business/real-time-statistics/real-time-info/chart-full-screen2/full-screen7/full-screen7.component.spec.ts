import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreen7Component } from './full-screen7.component';

describe('FullScreen7Component', () => {
  let component: FullScreen7Component;
  let fixture: ComponentFixture<FullScreen7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreen7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreen7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
