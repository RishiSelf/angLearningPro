import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InnerDashboardHeaderComponent } from './inner-dashboard-header.component';

describe('InnerDashboardHeaderComponent', () => {
  let component: InnerDashboardHeaderComponent;
  let fixture: ComponentFixture<InnerDashboardHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InnerDashboardHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InnerDashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
