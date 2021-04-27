import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullUserTypeRatioComponent } from './full-user-type-ratio.component';

describe('FullUserTypeRatioComponent', () => {
  let component: FullUserTypeRatioComponent;
  let fixture: ComponentFixture<FullUserTypeRatioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullUserTypeRatioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullUserTypeRatioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
