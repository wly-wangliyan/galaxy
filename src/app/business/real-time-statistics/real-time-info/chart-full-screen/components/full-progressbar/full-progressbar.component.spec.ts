import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullProgressbarComponent } from './full-progressbar.component';

describe('FullProgressbarComponent', () => {
  let component: FullProgressbarComponent;
  let fixture: ComponentFixture<FullProgressbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullProgressbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullProgressbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
