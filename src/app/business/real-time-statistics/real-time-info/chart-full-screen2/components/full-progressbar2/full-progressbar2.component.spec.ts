import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullProgressbar2Component } from './full-progressbar2.component';

describe('FullProgressbar2Component', () => {
  let component: FullProgressbar2Component;
  let fixture: ComponentFixture<FullProgressbar2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullProgressbar2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullProgressbar2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
