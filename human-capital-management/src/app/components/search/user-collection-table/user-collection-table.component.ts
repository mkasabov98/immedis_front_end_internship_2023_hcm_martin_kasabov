import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { userToShowInTableInterface } from 'src/app/interfaces/user.interface';
import { debounce } from 'src/app/services/utilityFunctions/utility-functions';
import { selectAllUsersSpecificInfo } from 'src/app/store/userCollectionReducer/user-collection.selectors';

@Component({
  selector: 'app-user-collection-table',
  templateUrl: './user-collection-table.component.html',
  styleUrls: ['./user-collection-table.component.scss']
})
export class UserCollectionTableComponent implements OnInit, OnDestroy, AfterViewInit {
  private destroy$ = new Subject<void>()
  
  tableColumns = ["id", "firstName", "directManagerName", "position", "department", "salary", "details"];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private store: Store<StoreInterface>,
    private router: Router
    ) { }


  userCollection$: Observable<userToShowInTableInterface[]> = new Observable();
  userCollection!: MatTableDataSource<userToShowInTableInterface>;


  ngOnInit(): void {
    this.userCollection$ = this.store.select(selectAllUsersSpecificInfo);
    this.userCollection$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.userCollection = new MatTableDataSource(data)
    })
  }

  ngAfterViewInit(): void {
    this.userCollection.paginator = this.paginator;
    this.userCollection.sort = this.sort;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  debouncedApplyFilter = debounce((event: Event) => {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userCollection.filter = filterValue.trim().toLowerCase();
  }, 500)

  handleDetailsButtonClick(id: number) {
    this.router.navigate([`app/user/${id}`])
  }
}
