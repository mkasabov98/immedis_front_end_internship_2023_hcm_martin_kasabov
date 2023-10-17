import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoreInterface } from './store/store.interface';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  // loggedUser$: {} | null;
  constructor(private router: Router, private store: Store<StoreInterface>) {
    // this.loggedUser$ = store.select("loggedUser")
  }
  title = 'human-capital-management';

  ngOnInit() {
    this.store.select(state => state.loggedUser).subscribe(loggedUser => {
      if (loggedUser) {
        this.router.navigate(["app/home"]) 
        console.log(loggedUser)
      } else {
        this.router.navigate(["login"])
      }
     
    })


  }
}
