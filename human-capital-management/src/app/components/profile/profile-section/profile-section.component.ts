import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { StoreInterface } from 'src/app/store/store.interface';
import { Observable, Subject, takeUntil } from "rxjs"
import { selectLoggedUser } from 'src/app/store/loginReducer/login.selectors';
import { userInterface } from 'src/app/interfaces/user.interface';
import { selectUserCollection } from 'src/app/store/userCollectionReducer/user-collection.selectors';
import { NgForm } from '@angular/forms';
import { changePassword } from 'src/app/store/userCollectionReducer/user-collection.actions';
@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss']
})
export class ProfileSectionComponent implements OnInit, OnDestroy {
  showChangePasswordSectionFlag = false;
  wrongCurrentPasswordFlag = false;
  wrongNewPasswordFlag = false;

  loggedUser$: Observable<loggedUSerInterface | null> = new Observable();
  userCollection$: Observable<userInterface[]> = new Observable();

  loggedUser!: loggedUSerInterface | null;
  userCollection: userInterface[] = [];
  loggedUserToShow!: userInterface;
  private destroy$ = new Subject<void>();

  constructor(private store: Store<StoreInterface>) { }

  ngOnInit(): void {
    this.loggedUser$ = this.store.select(selectLoggedUser);
    this.loggedUser$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.loggedUser = data;
    })
    this.userCollection$ = this.store.select(selectUserCollection);
    this.userCollection$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.userCollection = data;
      this.loggedUserToShow = this.userCollection.find(user => user.id === this.loggedUser?.id) as userInterface;
      console.log(this.loggedUserToShow)
    })

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onChangePassword() {
    this.showChangePasswordSectionFlag = !this.showChangePasswordSectionFlag;
    console.log(this.showChangePasswordSectionFlag)
  }

  onPasswordChangeFormSUbmit(form: NgForm) {
    this.wrongCurrentPasswordFlag = false;
    this.wrongNewPasswordFlag = false;
    const loggedUserPassword = this.loggedUserToShow.password;
    const { currentPassword, newPassword, RepeatedNewPassword } = form.value;


    if (currentPassword !== loggedUserPassword) {
      this.wrongCurrentPasswordFlag = true;
    } else if (newPassword !== RepeatedNewPassword) {
      this.wrongNewPasswordFlag = true;
    }
    if (currentPassword === loggedUserPassword && newPassword === RepeatedNewPassword) {
      this.store.dispatch(changePassword({userID: this.loggedUser!.id, newPassword: newPassword}));
      alert("password has been changed");
      form.resetForm();
    }
  }
}
