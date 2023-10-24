import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCompanyDetailsFormComponent } from './add-company-details-form.component';

describe('AddCompanyDetailsFormComponent', () => {
  let component: AddCompanyDetailsFormComponent;
  let fixture: ComponentFixture<AddCompanyDetailsFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCompanyDetailsFormComponent]
    });
    fixture = TestBed.createComponent(AddCompanyDetailsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
