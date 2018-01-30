import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutusCompComponent } from './aboutus-comp.component';

describe('AboutusCompComponent', () => {
  let component: AboutusCompComponent;
  let fixture: ComponentFixture<AboutusCompComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutusCompComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutusCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
