import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamineSystemComponent } from './examine-system.component';

describe('ExamineSystemComponent', () => {
  let component: ExamineSystemComponent;
  let fixture: ComponentFixture<ExamineSystemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamineSystemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamineSystemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
