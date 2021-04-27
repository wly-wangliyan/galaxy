import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullOnlineStateComponent } from './full-online-state.component';

describe('FullOnlineStateComponent', () => {
  let component: FullOnlineStateComponent;
  let fixture: ComponentFixture<FullOnlineStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullOnlineStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullOnlineStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
