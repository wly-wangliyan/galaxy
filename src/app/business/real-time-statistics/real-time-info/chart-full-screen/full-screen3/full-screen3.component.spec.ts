import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreen3Component } from './full-screen3.component';

describe('FullScreen3Component', () => {
  let component: FullScreen3Component;
  let fixture: ComponentFixture<FullScreen3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreen3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreen3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
