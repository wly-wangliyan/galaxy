import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSelectGroupsComponent } from './select-groups.component';

describe('EditSelectGroupsComponent', () => {
  let component: EditSelectGroupsComponent;
  let fixture: ComponentFixture<EditSelectGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSelectGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSelectGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
