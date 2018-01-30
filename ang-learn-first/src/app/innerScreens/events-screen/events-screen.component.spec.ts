import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsScreenComponent } from './events-screen.component';

describe('EventsScreenComponent', () => {
  let component: EventsScreenComponent;
  let fixture: ComponentFixture<EventsScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
