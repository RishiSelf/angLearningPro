import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivitiesScreenComponent } from './activities-screen.component';

describe('ActivitiesScreenComponent', () => {
  let component: ActivitiesScreenComponent;
  let fixture: ComponentFixture<ActivitiesScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitiesScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitiesScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
