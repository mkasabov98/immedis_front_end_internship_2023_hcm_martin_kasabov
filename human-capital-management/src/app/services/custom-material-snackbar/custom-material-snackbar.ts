import { Component, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class CustomMaterialSnackbarComponent {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string): void {
    this.snackBar.open(message, "Close", {
      duration: 6000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
}
