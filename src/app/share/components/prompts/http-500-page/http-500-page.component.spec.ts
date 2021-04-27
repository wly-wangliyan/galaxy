import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Http500PageComponent } from './http-500-page.component';

describe('Http500PageComponent', () => {
  let component: Http500PageComponent;
  let fixture: ComponentFixture<Http500PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Http500PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Http500PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
