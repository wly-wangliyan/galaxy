import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckPendingComponent } from './check-pending.component';

describe('CheckPendingComponent', () => {
  let component: CheckPendingComponent;
  let fixture: ComponentFixture<CheckPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
