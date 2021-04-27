import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitNumberComponent } from './split-number.component';

describe('SplitNumberComponent', () => {
  let component: SplitNumberComponent;
  let fixture: ComponentFixture<SplitNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SplitNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
