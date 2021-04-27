import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreen6Component } from './full-screen6.component';

describe('FullScreen6Component', () => {
  let component: FullScreen6Component;
  let fixture: ComponentFixture<FullScreen6Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreen6Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreen6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
