import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingsAddComponent } from './parkings-add.component';

describe('ParkingsAddComponent', () => {
  let component: ParkingsAddComponent;
  let fixture: ComponentFixture<ParkingsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkingsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkingsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
