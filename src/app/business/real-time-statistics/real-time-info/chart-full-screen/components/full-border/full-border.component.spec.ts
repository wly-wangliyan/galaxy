import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullBorderComponent } from './full-border.component';

describe('FullBorderComponent', () => {
  let component: FullBorderComponent;
  let fixture: ComponentFixture<FullBorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullBorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
