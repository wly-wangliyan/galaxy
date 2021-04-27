import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationCompanyListComponent } from './operation-company-list.component';

describe('OperationCompanyListComponent', () => {
  let component: OperationCompanyListComponent;
  let fixture: ComponentFixture<OperationCompanyListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperationCompanyListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationCompanyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
