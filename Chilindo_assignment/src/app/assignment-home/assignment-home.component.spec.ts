import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentHomeComponent } from './assignment-home.component';

describe('AssignmentHomeComponent', () => {
  let component: AssignmentHomeComponent;
  let fixture: ComponentFixture<AssignmentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
