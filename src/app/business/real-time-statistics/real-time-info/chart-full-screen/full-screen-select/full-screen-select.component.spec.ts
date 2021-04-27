import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenSelectComponent } from './full-screen-select.component';

describe('FullScreenSelectComponent', () => {
  let component: FullScreenSelectComponent;
  let fixture: ComponentFixture<FullScreenSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreenSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
