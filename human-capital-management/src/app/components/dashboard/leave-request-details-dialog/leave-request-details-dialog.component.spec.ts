import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestDetailsDialogComponent } from './leave-request-details-dialog.component';

describe('LeaveRequestDetailsDialogComponent', () => {
  let component: LeaveRequestDetailsDialogComponent;
  let fixture: ComponentFixture<LeaveRequestDetailsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LeaveRequestDetailsDialogComponent]
    });
    fixture = TestBed.createComponent(LeaveRequestDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
