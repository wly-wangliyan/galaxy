import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreen1Component } from './full-screen1.component';

describe('FullScreen1Component', () => {
  let component: FullScreen1Component;
  let fixture: ComponentFixture<FullScreen1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreen1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreen1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
