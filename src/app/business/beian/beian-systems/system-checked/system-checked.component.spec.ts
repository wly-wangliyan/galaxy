import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemCheckedComponent } from './system-checked.component';

describe('SystemCheckedComponent', () => {
  let component: SystemCheckedComponent;
  let fixture: ComponentFixture<SystemCheckedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SystemCheckedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SystemCheckedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
