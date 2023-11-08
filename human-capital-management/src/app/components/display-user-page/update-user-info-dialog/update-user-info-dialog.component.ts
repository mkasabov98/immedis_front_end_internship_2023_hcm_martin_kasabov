import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Subject, take } from 'rxjs';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { userInterface } from 'src/app/interfaces/user.interface';
import { CustomMaterialSnackbarComponent } from 'src/app/services/custom-material-snackbar/custom-material-snackbar';
import { selectAllCurrencies } from 'src/app/store/countryDetailsReducer/country-details.selectors';
import { updateUserInformation } from 'src/app/store/userCollectionReducer/user-collection.actions';
import { selectAllManagers, selectUserByExistingEmail, selectUserByExistingNumber } from 'src/app/store/userCollectionReducer/user-collection.selectors';
import { selectAllDepartments, selectAllPositions } from 'src/app/store/workforceDetailsReducer/workforceDetails.selectors';

@Component({
  selector: 'app-update-user-info-dialog',
  templateUrl: './update-user-info-dialog.component.html',
  styleUrls: ['./update-user-info-dialog.component.scss']
})
export class UpdateUserInfoDialogComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public user: userInterface,
    private dialogRef: MatDialogRef<UpdateUserInfoDialogComponent>,
    private store: Store<StoreInterface>,
    private snackbar: CustomMaterialSnackbarComponent
  ) { }

  private destroy$ = new Subject<void>();

  userToUpdate!: userInterface;

  emailFlag = false;
  phoneNumberFlag = false;

  currencies: string[] = [];
  departments: string[] = [];
  positions: string[] = [];
  managersCollection: { id: number, firstName: string, lastName: string }[] = [];

  ngOnInit(): void {
    this.userToUpdate = { ...this.user };
    this.store.select(selectAllCurrencies).pipe(take(1)).subscribe(data => {
      this.currencies = data;
    })
    this.store.select(selectAllDepartments).pipe(take(1)).subscribe(data => {
      this.departments = data;
    })
    this.store.select(selectAllPositions).pipe(take(1)).subscribe(data => {
      this.positions = data;
    })
    this.store.select(selectAllManagers).pipe(take(1)).subscribe(data => {
      this.managersCollection = data
    })
  }

  onSubmitForm(form: NgForm) {
    this.emailFlag = false;
    this.phoneNumberFlag = false;
    let existingEmail = false;
    let existingPhoneNumber = false;
    if (this.userToUpdate.position === "manager") {
      this.userToUpdate.manager = true;
      this.userToUpdate.directManagerID = null;
    } else {
      this.userToUpdate.manager = false;
    }
    this.store.select(store => selectUserByExistingEmail(store, this.userToUpdate.email, this.userToUpdate.id)).
      pipe(take(1)).subscribe(data => {
        if (data === true) {
          this.emailFlag = true;
          existingEmail = true;
        }
      })

    this.store.select(store => selectUserByExistingNumber(store, Number(this.userToUpdate.phoneNumber), this.userToUpdate.id)).
      pipe(take(1)).subscribe(data => {
        if (data === true) {
          this.phoneNumberFlag = true;
          existingPhoneNumber = true;
        }
      })

    if (existingEmail === false && existingPhoneNumber === false) {
      this.store.dispatch(updateUserInformation({ userToUpdate: this.userToUpdate }))
      this.dialogRef.close();
      this.snackbar.openSnackBar("Information has been saved and updated")
    }
  }
}
