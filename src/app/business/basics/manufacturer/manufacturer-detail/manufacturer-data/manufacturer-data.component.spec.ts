import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerDataComponent } from './manufacturer-data.component';

describe('ManufacturerDataComponent', () => {
  let component: ManufacturerDataComponent;
  let fixture: ComponentFixture<ManufacturerDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
