import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessMessagePanelComponent } from './success-message-panel.component';

describe('SuccessMessagePanelComponent', () => {
  let component: SuccessMessagePanelComponent;
  let fixture: ComponentFixture<SuccessMessagePanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessMessagePanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessMessagePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
