import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeianComponent } from './beian.component';

describe('BeianComponent', () => {
  let component: BeianComponent;
  let fixture: ComponentFixture<BeianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
