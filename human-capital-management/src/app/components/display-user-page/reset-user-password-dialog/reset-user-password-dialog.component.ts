import { Component, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { changePassword } from 'src/app/store/userCollectionReducer/user-collection.actions';
import { CustomMaterialSnackbarComponent } from '../../../services/custom-material-snackbar/custom-material-snackbar';

@Component({
  selector: 'app-reset-user-password-dialog',
  templateUrl: './reset-user-password-dialog.component.html',
  styleUrls: ['./reset-user-password-dialog.component.scss']
})
export class ResetUserPasswordDialogComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public userId: number,
    private dialogRef: MatDialogRef<ResetUserPasswordDialogComponent>,
    private store: Store<StoreInterface>,
    private snackBar: CustomMaterialSnackbarComponent
  ) { }

  passwordsMatchFlag = false;

  onSubmitResetPasswordForm(form: NgForm) {
    if (form.value.newPassword !== form.value.repeatedPassword) {
      this.passwordsMatchFlag = true;
    } else {
      this.store.dispatch(changePassword({ userID: this.userId, newPassword: form.value.newPassword }))
      this.snackBar.openSnackBar("Password for this user has been changed!")
      this.dialogRef.close();
    }
  }
}
