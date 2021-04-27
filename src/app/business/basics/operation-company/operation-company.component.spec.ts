import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCompanyComponent } from './operation-company.component';

describe('OperationCompanyComponent', () => {
  let component: OperationCompanyComponent;
  let fixture: ComponentFixture<OperationCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
