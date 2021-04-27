import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenContainerComponent } from './full-screen-container.component';

describe('FullScreenContainerComponent', () => {
  let component: FullScreenContainerComponent;
  let fixture: ComponentFixture<FullScreenContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreenContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
