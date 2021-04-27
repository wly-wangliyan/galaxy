import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreen4Component } from './full-screen4.component';

describe('FullScreen4Component', () => {
  let component: FullScreen4Component;
  let fixture: ComponentFixture<FullScreen4Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreen4Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreen4Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
