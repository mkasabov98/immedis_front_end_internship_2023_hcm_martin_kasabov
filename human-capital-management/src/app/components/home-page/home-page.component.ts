import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { Observable, Subject, takeUntil, switchMap } from "rxjs"
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { Store } from '@ngrx/store';
import { selectLoggedUser } from 'src/app/store/loginReducer/login.selectors';
import { userInterface } from 'src/app/interfaces/user.interface';
import { selectLoggedUserDepartment, selectLoggedUserTeam } from 'src/app/store/userCollectionReducer/user-collection.selectors';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {

  constructor(private store: Store<StoreInterface>) { }

  private destroy$ = new Subject<void>()

  loggedUser$: Observable<loggedUSerInterface | null> = new Observable()
  loggedUserTeam$: Observable<userInterface[]> = new Observable();
  loggedUserDepartmentCollection$: Observable<userInterface[]> = new Observable();
  loggedUser!: loggedUSerInterface | null;
  loggedUserTeam: userInterface[] = [];
  loggedUserDepartmentCollection: userInterface[] = [];

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(selectLoggedUser);
    this.loggedUser$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.loggedUser = data;
      console.log(this.loggedUser)
    })
    this.loggedUserTeam$ = this.store.select(state => selectLoggedUserTeam(state, this.loggedUser?.id!));
    this.loggedUserTeam$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.loggedUserTeam = data;
    })
    this.loggedUserDepartmentCollection$ = this.store.select(state => selectLoggedUserDepartment(state, this.loggedUser?.id!));
    this.loggedUserDepartmentCollection$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.loggedUserDepartmentCollection = data;
      console.log(this.loggedUserDepartmentCollection);
    })
  }

//   ngOnInit(): void {
//     this.loggedUser$ = this.store.select(selectLoggedUser);

//     this.loggedUser$.pipe(
//       takeUntil(this.destroy$),
//       switchMap(loggedUser => {
//         this.loggedUser = loggedUser;
//         console.log(this.loggedUser);

//         return this.store.select(state => selectLoggedUserTeam(state, this.loggedUser?.id!));
//       })
//     ).subscribe(loggedUserTeam => {
//       this.loggedUserTeam = loggedUserTeam;
//       console.log(this.loggedUserTeam);
//     });
// }
  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
