import { AfterViewInit, Component, OnDestroy, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil} from "rxjs";
import { leaveRequestInterface } from 'src/app/interfaces/leaveRequest.interface';
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { selectAllRequestsBySpecificUser } from 'src/app/store/leaveRequestsCollectionReducer/leaveRequestsCollection.selectors';

@Component({
  selector: 'app-personal-leave-requests-table',
  templateUrl: './personal-leave-requests-table.component.html',
  styleUrls: ['./personal-leave-requests-table.component.scss']
})
export class PersonalLeaveRequestsTableComponent implements OnInit, OnDestroy, AfterViewInit{
  private destroy$ = new Subject<void>();

  @Input() looggedUser!: loggedUSerInterface | null;
  @ViewChild(MatPaginator, {static:false}) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort

  tableColumns = ["dateOfCreation", "startDate", "endDate", "isAccepted", "message", "handledOn", "handlerName"]

  constructor(
    private store: Store<StoreInterface>
  ){}

  personalRequests$: Observable<leaveRequestInterface[]> = new Observable();
  personalRequests!: MatTableDataSource<leaveRequestInterface>;
  personalRequestsCollection!: leaveRequestInterface[];

  ngOnInit(): void {
    this.personalRequests$ = this.store.select(store => selectAllRequestsBySpecificUser(store, this.looggedUser!.id));
    this.personalRequests$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.personalRequests = new MatTableDataSource(data);
      this.personalRequestsCollection = data;
      console.log(this.personalRequestsCollection)
    })
  }

  ngAfterViewInit(): void {
    setInterval(() => {
      this.personalRequests.paginator = this.paginator;
      this.personalRequests.sort = this.sort
    },10)
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
