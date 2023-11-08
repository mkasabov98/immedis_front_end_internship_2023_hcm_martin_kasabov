import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms"
import { Store } from '@ngrx/store';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { userInterface } from 'src/app/interfaces/user.interface';
import { leaveRequest } from 'src/app/model/leaveRequest';
import { CustomMaterialSnackbarComponent } from 'src/app/services/custom-material-snackbar/custom-material-snackbar';
import { addLeaveRequest } from 'src/app/store/leaveRequestsCollectionReducer/leaveRequestsCollection.actions';
import { Observable, Subject, takeUntil} from 'rxjs'
import { selectSpecificUser } from 'src/app/store/userCollectionReducer/user-collection.selectors';

@Component({
  selector: 'app-leave-request-form',
  templateUrl: './leave-request-form.component.html',
  styleUrls: ['./leave-request-form.component.scss']
})
export class LeaveRequestFormComponent implements OnInit, OnDestroy{
  private destroy$ = new Subject<void>()

  leaveRequestForm: FormGroup;
  @Input() loggedUserId!: number | undefined;

  userToShow$: Observable<userInterface | undefined> = new Observable()
  userToShow!: userInterface | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<StoreInterface>,
    private snackBar: CustomMaterialSnackbarComponent
  ) {
    this.leaveRequestForm = this.formBuilder.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.userToShow$ = this.store.select(store => selectSpecificUser(store, this.loggedUserId!));
    this.userToShow$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.userToShow = data;
    })
  }

  ngOnDestroy(): void {
    
  }

  onSubmitLeaveRequestForm() {
    if (this.leaveRequestForm.valid) {
      const startDate = this.leaveRequestForm.get('startDate')!.value;
      const endDate = this.leaveRequestForm.get('endDate')!.value;
      const newLeaveRequest = new leaveRequest(
        `${startDate.getMonth() + 1}/${startDate.getDate()}/${startDate.getFullYear()}`,
        `${endDate.getMonth() + 1}/${endDate.getDate()}/${endDate.getFullYear()}`,
        this.loggedUserId!,
        `${this.userToShow?.firstName} ${this.userToShow?.lastName}`
      );
      this.store.dispatch(addLeaveRequest(newLeaveRequest));
      this.snackBar.openSnackBar("Leave Request has been submited!")
      this.leaveRequestForm.reset()
      this.leaveRequestForm.markAsUntouched();
      this.leaveRequestForm.markAsPristine();
    }
  }
}
