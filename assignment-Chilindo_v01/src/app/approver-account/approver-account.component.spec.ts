import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproverAccountComponent } from './approver-account.component';

describe('ApproverAccountComponent', () => {
  let component: ApproverAccountComponent;
  let fixture: ComponentFixture<ApproverAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApproverAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproverAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
