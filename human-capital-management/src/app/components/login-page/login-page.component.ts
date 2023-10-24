import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { USERS } from 'src/app/data/users';
import { userInterface } from 'src/app/interfaces/user.interface';
import { login } from 'src/app/store/loginReducer/login.actions';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { selectUserCollection } from 'src/app/store/userCollectionReducer/user-collection.selectors';
import { StoreInterface } from 'src/app/interfaces/store.interface';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  constructor(private router: Router, private store: Store<StoreInterface>) { }
  incorrectInput = false;

  usersCollection$: Observable<userInterface[]> = new Observable();
  private destory$ = new Subject<void>();
  userCollection: userInterface[] = [];

  ngOnInit(): void {
    this.usersCollection$ = this.store.select(selectUserCollection);
    this.usersCollection$.pipe(takeUntil(this.destory$)).subscribe(data => {
      this.userCollection = data;
    })
  }

  ngOnDestroy(): void {
    this.destory$.next();
    this.destory$.complete();
  }

  resetIncorrectInput() {
    this.incorrectInput = false;
  }

  onSubmit(form: NgForm) {
    const emailInput = form.value.email;
    const passInput = form.value.password;
    const existingUser = this.userCollection.find(user => user.email === emailInput && user.password === passInput);

    if (existingUser) {
      this.store.dispatch(login(existingUser));
      this.router.navigate(["app/home"]);
      this.incorrectInput = false;
    } else {
      this.incorrectInput = true;
    }
  }
}
