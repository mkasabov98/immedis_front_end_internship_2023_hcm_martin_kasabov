import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { USERS } from 'src/app/data/users';
import { userInterface } from 'src/app/interfaces/user.interface';
import { login } from 'src/app/store/loginReducer/login.actions';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  constructor(private router: Router, private store: Store) {}
  
  users: userInterface[] = USERS;
  
  onSubmit(form: NgForm) {
    const emailInput = form.value.email;
    const passInput = form.value.password;
    const existingUser = USERS.find(user => user.email === emailInput && user.password === passInput);
    
    if (existingUser) {
      this.store.dispatch(login(existingUser))
      this.router.navigate(["app/home"])
    } else {
      alert("incorrect input")
    }
  }
}
