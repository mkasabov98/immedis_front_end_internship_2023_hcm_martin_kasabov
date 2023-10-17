import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from 'src/app/store/loginReducer/login.actions';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  standalone: false,
})
export class NavigationComponent {
  constructor(private router: Router, private store: Store){}

  onLogout() {
    this.store.dispatch(logout())
    alert("You have logout")
  }
}
