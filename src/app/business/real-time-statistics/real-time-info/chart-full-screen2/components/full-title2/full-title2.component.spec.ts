import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTitle2Component } from './full-title2.component';

describe('FullTitle2Component', () => {
  let component: FullTitle2Component;
  let fixture: ComponentFixture<FullTitle2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullTitle2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullTitle2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
