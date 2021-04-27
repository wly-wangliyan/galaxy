import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeautifyCheckboxComponent } from './beautify-checkbox.component';

describe('BeautifyCheckboxComponent', () => {
  let component: BeautifyCheckboxComponent;
  let fixture: ComponentFixture<BeautifyCheckboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeautifyCheckboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeautifyCheckboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
