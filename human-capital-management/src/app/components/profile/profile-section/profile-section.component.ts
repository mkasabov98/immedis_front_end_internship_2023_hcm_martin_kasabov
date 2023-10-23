import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { StoreInterface } from 'src/app/store/store.interface';
import { Observable, Subject, takeUntil } from "rxjs"
import { selectLoggedUser } from 'src/app/store/loginReducer/login.selectors';
import { userInterface } from 'src/app/interfaces/user.interface';
import { selectUserCollection } from 'src/app/store/userCollectionReducer/user-collection.selectors';
import { NgForm } from '@angular/forms';
import { changeEmail, changePassword, changeProfilePhoto, chnagePhoneNumber } from 'src/app/store/userCollectionReducer/user-collection.actions';
@Component({
  selector: 'app-profile-section',
  templateUrl: './profile-section.component.html',
  styleUrls: ['./profile-section.component.scss']
})
export class ProfileSectionComponent implements OnInit, OnDestroy {
  showChangePasswordSectionFlag = false;
  wrongCurrentPasswordFlag = false;
  wrongNewPasswordFlag = false;

  emailEditFlag = false;
  emailInputValue!: string;

  phoneNumberEditFlag = false;
  phoneNumberInputValue!: number;

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
      this.emailInputValue = this.loggedUserToShow.email;
      this.phoneNumberInputValue = this.loggedUserToShow.phoneNumber;
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

  onPasswordChangeFormSubmit(form: NgForm) {
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
      this.store.dispatch(changePassword({ userID: this.loggedUser!.id, newPassword: newPassword }));
      alert("password has been changed");
      form.resetForm();
      this.showChangePasswordSectionFlag = false;
    }
  }

  onEmailIconClick() {
    this.emailEditFlag = !this.emailEditFlag;
  }

  onChangeEmailFormSubmit(form: NgForm) {
    console.log(this.emailInputValue)
    this.store.dispatch(changeEmail({ userID: this.loggedUser!.id, newEmail: this.emailInputValue }))
    this.emailEditFlag = false;
  }

  onPhoneNumberIconClick() {
    this.phoneNumberEditFlag = !this.phoneNumberEditFlag
  }

  onChangePhoneNumberFormSubmit(form: NgForm) {
    console.log(this.phoneNumberInputValue)
    console.log(form)
    this.store.dispatch(chnagePhoneNumber({ userID: this.loggedUser!.id, newPhoneNumber: this.phoneNumberInputValue }));
    this.phoneNumberEditFlag = false;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];

    if (file && this.isImage(file)) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        this.store.dispatch(changeProfilePhoto({userID: this.loggedUser!.id, newProfilePhoto: base64Image}));
      };

      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image.');
    }
  }

  isImage(file: File): boolean {
    return file.type.split('/')[0] === 'image'; 
  }
}