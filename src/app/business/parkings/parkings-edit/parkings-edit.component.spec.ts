import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingsEditComponent } from './parkings-edit.component';

describe('ParkingsEditComponent', () => {
  let component: ParkingsEditComponent;
  let fixture: ComponentFixture<ParkingsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
