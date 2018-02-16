import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationInfoComponent } from './documentation-info.component';

describe('DocumentationInfoComponent', () => {
  let component: DocumentationInfoComponent;
  let fixture: ComponentFixture<DocumentationInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentationInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentationInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
