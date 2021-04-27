import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullMxNewUsersComponent } from './full-mx-new-users.component';

describe('FullMxNewUsersComponent', () => {
  let component: FullMxNewUsersComponent;
  let fixture: ComponentFixture<FullMxNewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullMxNewUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullMxNewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
