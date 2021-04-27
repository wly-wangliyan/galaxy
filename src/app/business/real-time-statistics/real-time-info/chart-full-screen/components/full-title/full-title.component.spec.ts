import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullTitleComponent } from './full-title.component';

describe('FullTitleComponent', () => {
  let component: FullTitleComponent;
  let fixture: ComponentFixture<FullTitleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullTitleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
