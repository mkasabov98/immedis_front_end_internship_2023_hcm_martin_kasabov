import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { CustomMaterialSnackbarComponent } from 'src/app/services/custom-material-snackbar/custom-material-snackbar';
import { deleteUser } from 'src/app/store/userCollectionReducer/user-collection.actions';

@Component({
  selector: 'app-delete-user-dialog',
  templateUrl: './delete-user-dialog.component.html',
  styleUrls: ['./delete-user-dialog.component.scss']
})
export class DeleteUserDialogComponent {
  

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {userId: number, loggedUser: loggedUSerInterface},
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private store: Store<StoreInterface>,
    private snackBar: CustomMaterialSnackbarComponent,
    private router: Router
  ){}

  deleteUser(){
    this.store.dispatch(deleteUser({id: this.data.userId}))
    this.dialogRef.close();
    this.snackBar.openSnackBar("User deleted!")
    if (this.data.loggedUser.permission === "admin") {
      console.log("admin")
      this.router.navigate(['app/search'])
    } else {
      console.log("!admin")
      console.log(this.data.userId)
      this.router.navigate(['app/home'])
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
