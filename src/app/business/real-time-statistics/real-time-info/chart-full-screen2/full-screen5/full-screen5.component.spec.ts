import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreen5Component } from './full-screen5.component';

describe('FullScreen5Component', () => {
  let component: FullScreen5Component;
  let fixture: ComponentFixture<FullScreen5Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreen5Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreen5Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
