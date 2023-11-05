import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { userInterface } from 'src/app/interfaces/user.interface';
import { selectSpecificUser, selectSpecificUserName } from 'src/app/store/userCollectionReducer/user-collection.selectors';
import { UpdateUserInfoDialogComponent } from './update-user-info-dialog/update-user-info-dialog.component';
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { selectLoggedUser } from 'src/app/store/loginReducer/login.selectors';
import { ResetUserPasswordDialogComponent } from './reset-user-password-dialog/reset-user-password-dialog.component';
import { DeleteUserDialogComponent } from './delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-display-user-page',
  templateUrl: './display-user-page.component.html',
  styleUrls: ['./display-user-page.component.scss']
})
export class DisplayUserPageComponent implements OnInit, OnDestroy {
  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<StoreInterface>,
    private dialog: MatDialog
  ) { }

  private destroy$ = new Subject<void>();

  userToShowId!: string | null;

  loggedUser$: Observable<loggedUSerInterface | null> = new Observable();
  user$: Observable<userInterface | undefined> = new Observable();
  userDirectManager$: Observable<string | null> = new Observable();
  loggedUser!: loggedUSerInterface | null;
  user!: userInterface | undefined;
  userDirectManager!: string | null;

  ngOnInit(): void {
    this.userToShowId = this.activatedRoute.snapshot.paramMap.get("id")
    this.user$ = this.store.select(store => selectSpecificUser(store, Number(this.userToShowId)));
    this.user$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.user = data;
      // console.log(this.user)
    })
    this.loggedUser$ = this.store.select(selectLoggedUser);
    this.loggedUser$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.loggedUser = data;
    })
    if (this.user) {
      this.userDirectManager$ = this.store.select(store => selectSpecificUserName(store, this.user?.directManagerID!))
      this.userDirectManager$.pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.userDirectManager = data;
        // console.log(this.userDirectManager)
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  openUserInfoDialog() {
    this.dialog.open(UpdateUserInfoDialogComponent, {
      data: this.user,
    })
  }

  openResetPasswordDialog() {
    this.dialog.open(ResetUserPasswordDialogComponent, {
      data: this.user?.id
    })
  }

  openDeleteUserDialog() {
    this.dialog.open(DeleteUserDialogComponent, {
      data: this.user?.id
    })
  }
}
