import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerPlatformComponent } from './manufacturer-platform.component';

describe('ManufacturerPlatformComponent', () => {
  let component: ManufacturerPlatformComponent;
  let fixture: ComponentFixture<ManufacturerPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManufacturerPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManufacturerPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
