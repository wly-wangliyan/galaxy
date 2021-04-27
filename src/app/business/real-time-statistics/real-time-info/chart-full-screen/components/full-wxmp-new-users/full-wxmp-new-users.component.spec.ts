import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullWxmpNewUsersComponent } from './full-wxmp-new-users.component';

describe('FullWxmpNewUsersComponent', () => {
  let component: FullWxmpNewUsersComponent;
  let fixture: ComponentFixture<FullWxmpNewUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullWxmpNewUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullWxmpNewUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
