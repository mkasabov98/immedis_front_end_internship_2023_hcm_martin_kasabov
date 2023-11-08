import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { selectNotHandledRequests } from 'src/app/store/leaveRequestsCollectionReducer/leaveRequestsCollection.selectors';
import { Observable, Subject, takeUntil} from 'rxjs'
import { leaveRequest } from 'src/app/model/leaveRequest';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { LeaveRequestDetailsDialogComponent } from './leave-request-details-dialog/leave-request-details-dialog.component';
import { leaveRequestInterface } from 'src/app/interfaces/leaveRequest.interface';
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { selectLoggedUser } from 'src/app/store/loginReducer/login.selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewInit{
  private destroy$ = new Subject<void>();

  tableColumns = ["userRequestingLeaveName", "startDate", "endDate", "dateOfCreation", "isAccepted", "detailsButton"]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<StoreInterface>,
    private dialog: MatDialog
    ){}

  notHandledLeaveRequests$: Observable<leaveRequestInterface[]> = new Observable();
  notHandledLeaveRequests!: MatTableDataSource<leaveRequestInterface>;
  loggedUser$: Observable<loggedUSerInterface | null> = new Observable();
  loggedUser!: loggedUSerInterface | null;

  ngOnInit(): void {
    this.notHandledLeaveRequests$ = this.store.select(selectNotHandledRequests);
    this.notHandledLeaveRequests$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.notHandledLeaveRequests = new MatTableDataSource(data);
    })

    this.loggedUser$ = this.store.select(selectLoggedUser);
    this.loggedUser$.pipe(takeUntil(this.destroy$)).subscribe(data => 
      this.loggedUser = data);
  }

  ngAfterViewInit(): void {
    this.notHandledLeaveRequests.paginator = this.paginator;
    this.notHandledLeaveRequests.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete()
  }

  onClickDetailsButton(leaveRequest: leaveRequestInterface, loggedUser: loggedUSerInterface){
    this.dialog.open(LeaveRequestDetailsDialogComponent, {
      data: {
        leaveRequest: leaveRequest,
        loggedUser: loggedUser
      }
    })
  }
}
