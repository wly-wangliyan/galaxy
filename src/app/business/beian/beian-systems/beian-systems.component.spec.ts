import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeianSystemsComponent } from './beian-systems.component';

describe('BeianSystemsComponent', () => {
  let component: BeianSystemsComponent;
  let fixture: ComponentFixture<BeianSystemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeianSystemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeianSystemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
