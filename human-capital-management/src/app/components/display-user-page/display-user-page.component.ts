import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { userInterface } from 'src/app/interfaces/user.interface';
import { selectSpecificUser, selectSpecificUserName } from 'src/app/store/userCollectionReducer/user-collection.selectors';
import { UpdateUserInfoDialogComponent } from './update-user-info-dialog/update-user-info-dialog.component';

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
  user$: Observable<userInterface | undefined> = new Observable();
  userDirectManager$: Observable<string | null> = new Observable();
  user!: userInterface | undefined;
  userDirectManager!: string | null;

  ngOnInit(): void {
    this.userToShowId = this.activatedRoute.snapshot.paramMap.get("id")
    this.user$ = this.store.select(store => selectSpecificUser(store, Number(this.userToShowId)));
    this.user$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.user = data;
      console.log(this.user)
    })
    if (this.user) {
      this.userDirectManager$ = this.store.select(store => selectSpecificUserName(store, this.user?.directManagerID!))
      this.userDirectManager$.pipe(takeUntil(this.destroy$)).subscribe(data => {
        this.userDirectManager = data;
        console.log(this.userDirectManager)
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

  openDialog() {
    const dialogRef = this.dialog.open(UpdateUserInfoDialogComponent, {
      width: '250px',
      height: '400px',
      data: this.user
    })
  }
}
