import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropDownBoxComponent } from './drop-down-box.component';

describe('DropDownBoxComponent', () => {
  let component: DropDownBoxComponent;
  let fixture: ComponentFixture<DropDownBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropDownBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropDownBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
