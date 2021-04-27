import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatScrollNumberComponent } from './chat-scroll-number.component';

describe('ChatScrollNumberComponent', () => {
  let component: ChatScrollNumberComponent;
  let fixture: ComponentFixture<ChatScrollNumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatScrollNumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatScrollNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
