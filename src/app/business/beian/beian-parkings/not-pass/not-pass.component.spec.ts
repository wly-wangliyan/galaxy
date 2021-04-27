import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotPassComponent } from './not-pass.component';

describe('NotPassComponent', () => {
  let component: NotPassComponent;
  let fixture: ComponentFixture<NotPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
