import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCheckPendingComponent } from './system-check-pending.component';

describe('SystemCheckPendingComponent', () => {
  let component: SystemCheckPendingComponent;
  let fixture: ComponentFixture<SystemCheckPendingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemCheckPendingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemCheckPendingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
