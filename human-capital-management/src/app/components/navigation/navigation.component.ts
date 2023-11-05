import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { CustomMaterialSnackbarComponent } from 'src/app/services/custom-material-snackbar/custom-material-snackbar';
import { logout } from 'src/app/store/loginReducer/login.actions';
import { Observable, Subject, take, takeUntil } from "rxjs"
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { selectLoggedUser } from 'src/app/store/loginReducer/login.selectors';


@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<StoreInterface>,
    private snackBar: CustomMaterialSnackbarComponent
  ) { }

  private destroy$ = new Subject <void>();

  loggedUser$: Observable<loggedUSerInterface | null> = new Observable();
  loggedUser!: loggedUSerInterface | null;

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(selectLoggedUser);
    this.loggedUser$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.loggedUser = data;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

  onLogout() {
    this.store.dispatch(logout())
    this.snackBar.openSnackBar("You have logout")
  }
}
