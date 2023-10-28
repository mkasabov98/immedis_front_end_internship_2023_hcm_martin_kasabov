import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CustomMaterialSnackbarComponent } from 'src/app/services/custom-material-snackbar/custom-material-snackbar';
import { logout } from 'src/app/store/loginReducer/login.actions';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: false,
})
export class NavigationComponent {
  constructor(
    private store: Store,
    private snackBar: CustomMaterialSnackbarComponent
  ) { }

  onLogout() {
    this.store.dispatch(logout())
    this.snackBar.openSnackBar("You have logout")
  }
}
