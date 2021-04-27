import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeianParkingsComponent } from './beian-parkings.component';

describe('BeianParkingsComponent', () => {
  let component: BeianParkingsComponent;
  let fixture: ComponentFixture<BeianParkingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeianParkingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeianParkingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
