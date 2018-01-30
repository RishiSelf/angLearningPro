import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCompComponent } from './home-comp.component';

describe('HomeCompComponent', () => {
  let component: HomeCompComponent;
  let fixture: ComponentFixture<HomeCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
