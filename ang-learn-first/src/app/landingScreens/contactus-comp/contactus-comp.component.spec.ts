import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusCompComponent } from './contactus-comp.component';

describe('ContactusCompComponent', () => {
  let component: ContactusCompComponent;
  let fixture: ComponentFixture<ContactusCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactusCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactusCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
