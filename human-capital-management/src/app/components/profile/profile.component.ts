import { Component, OnDestroy, OnInit } from '@angular/core';
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { Observable, takeUntil, Subject } from "rxjs"
import { Store } from '@ngrx/store';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { selectLoggedUser } from 'src/app/store/loginReducer/login.selectors';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  constructor(private store: Store<StoreInterface>) {}

  private destroy$ = new Subject<void>();

  loggedUser$: Observable<loggedUSerInterface | null> = new Observable();
  loggedUser!: loggedUSerInterface | null;
  loggedUserId!: number | undefined;

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(selectLoggedUser);
    this.loggedUser$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.loggedUserId = data?.id;
      this.loggedUser = data;
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
