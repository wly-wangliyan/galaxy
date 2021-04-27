import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautifyRadioComponent } from './beautify-radio.component';

describe('BeautifyRadioComponent', () => {
  let component: BeautifyRadioComponent;
  let fixture: ComponentFixture<BeautifyRadioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautifyRadioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeautifyRadioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
