import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PushSettingsComponent } from './push-settings.component';

describe('PushSettingsComponent', () => {
  let component: PushSettingsComponent;
  let fixture: ComponentFixture<PushSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PushSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PushSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
