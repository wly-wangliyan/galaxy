import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCompanyDataComponent } from './operation-company-data.component';

describe('OperationCompanyDataComponent', () => {
  let component: OperationCompanyDataComponent;
  let fixture: ComponentFixture<OperationCompanyDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationCompanyDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCompanyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
