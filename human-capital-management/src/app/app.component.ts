import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StoreInterface } from './interfaces/store.interface';
import { selectLoggedUser } from './store/loginReducer/login.selectors';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  constructor(private router: Router, private store: Store<StoreInterface>) {
  }
  title = 'human-capital-management';

  ngOnInit() {
    this.store.select(selectLoggedUser).pipe(takeUntil(this.destroy$))
      .subscribe(loggedUser => {
        if (loggedUser) {
          this.router.navigate(["app/home"]);
        } else {
          this.router.navigate(["login"]);
        }
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
