import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountTypeInfoComponent } from './account-type-info.component';

describe('AccountTypeInfoComponent', () => {
  let component: AccountTypeInfoComponent;
  let fixture: ComponentFixture<AccountTypeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountTypeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountTypeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
