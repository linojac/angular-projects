import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopNavPanelComponent } from './top-nav-panel.component';

describe('TopNavPanelComponent', () => {
  let component: TopNavPanelComponent;
  let fixture: ComponentFixture<TopNavPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopNavPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
