import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
    @Inject(MAT_DIALOG_DATA) public userId: number,
    private dialogRef: MatDialogRef<DeleteUserDialogComponent>,
    private store: Store<StoreInterface>,
    private snackBar: CustomMaterialSnackbarComponent,
    private router: Router
  ){}

  deleteUser(){
    this.store.dispatch(deleteUser({id: this.userId}))
    this.dialogRef.close();
    this.snackBar.openSnackBar("User deleated!")
    this.router.navigate(['app/search'])
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
