import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullCounterComponent } from './full-counter.component';

describe('FullCounterComponent', () => {
  let component: FullCounterComponent;
  let fixture: ComponentFixture<FullCounterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullCounterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
