import { Component, Input, OnInit } from '@angular/core';
import { loggedUSerInterface } from 'src/app/interfaces/loggedUser.interface';
import { userInterface } from 'src/app/interfaces/user.interface';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { StoreInterface } from 'src/app/interfaces/store.interface';
import { selectLoggedUser } from 'src/app/store/loginReducer/login.selectors';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss']
})
export class UserDetailsCardComponent implements OnInit {
  @Input() user!: userInterface;
  private destroy$ = new Subject<void>();

  constructor(private store: Store<StoreInterface>, private router: Router){}

  loggedUser$: Observable<loggedUSerInterface | null> = new Observable();
  loggedUser!: loggedUSerInterface | null;

  ngOnInit() {
    this.loggedUser$ = this.store.select(selectLoggedUser);
    this.loggedUser$.pipe(takeUntil(this.destroy$)).subscribe(data => {
      this.loggedUser = data;
    })
  }

  handleClick() {
    console.log("click")
    console.log(this.loggedUser)
    console.log(this.user.id)
    this.router.navigate([`app/user/${this.user.id}`])
  }

}
