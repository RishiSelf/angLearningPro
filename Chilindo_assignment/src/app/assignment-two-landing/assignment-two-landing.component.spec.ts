import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentTwoLandingComponent } from './assignment-two-landing.component';

describe('AssignmentTwoLandingComponent', () => {
  let component: AssignmentTwoLandingComponent;
  let fixture: ComponentFixture<AssignmentTwoLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentTwoLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentTwoLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
