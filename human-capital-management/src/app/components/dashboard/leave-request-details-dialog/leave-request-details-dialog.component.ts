import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { leaveRequestInterface } from 'src/app/interfaces/leaveRequest.interface';
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { userInterface } from 'src/app/interfaces/user.interface';
import { CustomMaterialSnackbarComponent } from 'src/app/services/custom-material-snackbar/custom-material-snackbar';
import { updateLeaveRequest } from 'src/app/store/leaveRequestsCollectionReducer/leaveRequestsCollection.actions';
import { selectSpecificUser } from 'src/app/store/userCollectionReducer/user-collection.selectors';

@Component({
  selector: 'app-leave-request-details-dialog',
  templateUrl: './leave-request-details-dialog.component.html',
  styleUrls: ['./leave-request-details-dialog.component.scss']
})
export class LeaveRequestDetailsDialogComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  leaveRequestToUpdate!: leaveRequestInterface;
  fullLoggedUser$: Observable<userInterface | undefined> = new Observable();
  fullLoggedUser!: userInterface | undefined;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { leaveRequest: leaveRequestInterface, loggedUser: loggedUSerInterface },
    private dialogRef: MatDialogRef<LeaveRequestDetailsDialogComponent>,
    private store: Store<StoreInterface>,
    private snackbar: CustomMaterialSnackbarComponent
  ) { }

  ngOnInit(): void {
    this.leaveRequestToUpdate = { ...this.data.leaveRequest }
    this.fullLoggedUser$ = this.store.select(store => selectSpecificUser(store, this.data.loggedUser.id));
    this.fullLoggedUser$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.fullLoggedUser = data;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  acceptLeaveRequest(form: NgForm) {
    this.leaveRequestToUpdate.message = form.value.message;
    this.leaveRequestToUpdate.isAccepted = true;
    this.leaveRequestToUpdate.handlerId = this.data.loggedUser.id;
    this.leaveRequestToUpdate.handledOn = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
    this.leaveRequestToUpdate.handlerName = `${this.fullLoggedUser?.firstName} ${this.fullLoggedUser?.lastName}`
    this.store.dispatch(updateLeaveRequest(this.leaveRequestToUpdate));
    this.dialogRef.close();
    this.snackbar.openSnackBar("The leave has been accepted! Please adjust the available leave days for this user!");
  }

  rejectLeaveRequest(form: NgForm) {
    this.leaveRequestToUpdate.message = form.value.message;
    this.leaveRequestToUpdate.isAccepted = false;
    this.leaveRequestToUpdate.handlerId = this.data.loggedUser.id;
    this.leaveRequestToUpdate.handledOn = `${new Date().getMonth() + 1}/${new Date().getDate()}/${new Date().getFullYear()}`;
    this.leaveRequestToUpdate.handlerName = `${this.fullLoggedUser?.firstName} ${this.fullLoggedUser?.lastName}`
    this.store.dispatch(updateLeaveRequest(this.leaveRequestToUpdate));
    this.dialogRef.close();
    this.snackbar.openSnackBar("The leave has been rejected");
  }
}
