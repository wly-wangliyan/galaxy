import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCompanyDetailComponent } from './operation-company-detail.component';

describe('OperationCompanyDetailComponent', () => {
  let component: OperationCompanyDetailComponent;
  let fixture: ComponentFixture<OperationCompanyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationCompanyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCompanyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
