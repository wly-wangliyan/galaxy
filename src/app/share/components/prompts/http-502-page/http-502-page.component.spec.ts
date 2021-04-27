import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Http502PageComponent } from './http-502-page.component';

describe('Http502PageComponent', () => {
  let component: Http502PageComponent;
  let fixture: ComponentFixture<Http502PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Http502PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Http502PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
