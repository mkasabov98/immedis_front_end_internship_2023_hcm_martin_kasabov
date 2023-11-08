import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { leaveRequestInterface } from 'src/app/interfaces/leaveRequest.interface';
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { CustomMaterialSnackbarComponent } from 'src/app/services/custom-material-snackbar/custom-material-snackbar';
import { updateLeaveRequest } from 'src/app/store/leaveRequestsCollectionReducer/leaveRequestsCollection.actions';

@Component({
  selector: 'app-leave-request-details-dialog',
  templateUrl: './leave-request-details-dialog.component.html',
  styleUrls: ['./leave-request-details-dialog.component.scss']
})
export class LeaveRequestDetailsDialogComponent implements OnInit {

  leaveRequestToUpdate!: leaveRequestInterface;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {leaveRequest: leaveRequestInterface, loggedUser: loggedUSerInterface},
    private dialogRef: MatDialogRef<LeaveRequestDetailsDialogComponent>,
    private store: Store<StoreInterface>,
    private snackbar: CustomMaterialSnackbarComponent
  ) { }

  ngOnInit(): void {
    this.leaveRequestToUpdate = { ...this.data.leaveRequest }
  }

  acceptLeaveRequest(form: NgForm) {
    this.leaveRequestToUpdate.message = form.value.message;
    this.leaveRequestToUpdate.isAccepted = true;
    this.leaveRequestToUpdate.handlerId = this.data.loggedUser.id;
    this.store.dispatch(updateLeaveRequest(this.leaveRequestToUpdate));
    this.dialogRef.close();
    this.snackbar.openSnackBar("The leave has been accepted");
  }

  rejectLeaveRequest(form: NgForm) {
    this.leaveRequestToUpdate.message = form.value.message;
    this.leaveRequestToUpdate.isAccepted = false;
    this.leaveRequestToUpdate.handlerId = this.data.loggedUser.id;
    this.store.dispatch(updateLeaveRequest(this.leaveRequestToUpdate));
    this.dialogRef.close();
    this.snackbar.openSnackBar("The leave has been rejected");
  }
}
