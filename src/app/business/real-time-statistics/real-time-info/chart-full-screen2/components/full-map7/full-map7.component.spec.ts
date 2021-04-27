import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMap7Component } from './full-map7.component';

describe('FullMap7Component', () => {
  let component: FullMap7Component;
  let fixture: ComponentFixture<FullMap7Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMap7Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMap7Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
