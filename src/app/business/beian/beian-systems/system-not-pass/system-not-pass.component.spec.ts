import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemNotPassComponent } from './system-not-pass.component';

describe('SystemNotPassComponent', () => {
  let component: SystemNotPassComponent;
  let fixture: ComponentFixture<SystemNotPassComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemNotPassComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemNotPassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
