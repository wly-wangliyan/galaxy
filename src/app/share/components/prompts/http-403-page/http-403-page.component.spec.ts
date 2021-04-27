import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Http403PageComponent } from './http-403-page.component';

describe('Http403PageComponent', () => {
  let component: Http403PageComponent;
  let fixture: ComponentFixture<Http403PageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Http403PageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Http403PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
