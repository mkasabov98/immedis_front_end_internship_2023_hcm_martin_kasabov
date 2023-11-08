import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalLeaveRequestsTableComponent } from './personal-leave-requests-table.component';

describe('PersonalLeaveRequestsTableComponent', () => {
  let component: PersonalLeaveRequestsTableComponent;
  let fixture: ComponentFixture<PersonalLeaveRequestsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PersonalLeaveRequestsTableComponent]
    });
    fixture = TestBed.createComponent(PersonalLeaveRequestsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
