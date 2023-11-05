import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { userInterface } from 'src/app/interfaces/user.interface';
import { selectUserCollection } from 'src/app/store/userCollectionReducer/user-collection.selectors';

@Component({
  selector: 'app-user-collection-table',
  templateUrl: './user-collection-table.component.html',
  styleUrls: ['./user-collection-table.component.scss']
})
export class UserCollectionTableComponent implements OnInit, OnDestroy{

  constructor(private store: Store<StoreInterface>){}

  private destroy$ = new Subject<void>()

  userCollection$: Observable<userInterface[]> = new Observable();
  userCollection!: MatTableDataSource<userInterface>;

  tableColumns = ["id", "name", "position", "department", "salary"]

  ngOnInit(): void {
    this.userCollection$ = this.store.select(selectUserCollection);
    this.userCollection$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.userCollection = new MatTableDataSource(data)
      console.log(this.userCollection)
    })
  }

  ngOnDestroy(): void {
    
  }
}
