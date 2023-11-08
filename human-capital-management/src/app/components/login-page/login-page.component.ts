import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { userInterface } from 'src/app/interfaces/user.interface';
import { login } from 'src/app/store/loginReducer/login.actions';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { selectUserCollection } from 'src/app/store/userCollectionReducer/user-collection.selectors';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { CustomMaterialSnackbarComponent } from 'src/app/services/custom-material-snackbar/custom-material-snackbar';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private store: Store<StoreInterface>,
    private snackbar: CustomMaterialSnackbarComponent
    ) { }
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
      if (existingUser.permission === 'admin') {
        this.router.navigate(["app/addUser"]);
      } else if (existingUser.permission === 'employee' || existingUser.permission === 'HR') {
        this.router.navigate(["app/home"]);
        if (!existingUser.changedPassword) {
          this.snackbar.openSnackBar("Please navigate to the profile page and change your password!")
        }
      }
      this.incorrectInput = false;
    } else {
      this.incorrectInput = true;
    }
  }
}
