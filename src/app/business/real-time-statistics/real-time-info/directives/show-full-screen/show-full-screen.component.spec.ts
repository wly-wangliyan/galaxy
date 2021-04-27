import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFullScreenComponent } from './show-full-screen.component';

describe('ShowFullScreenComponent', () => {
  let component: ShowFullScreenComponent;
  let fixture: ComponentFixture<ShowFullScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFullScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFullScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
