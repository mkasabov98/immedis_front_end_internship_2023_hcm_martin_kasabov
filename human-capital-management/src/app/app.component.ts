import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(private router: Router) {

  }
  title = 'human-capital-management';

  ngOnInit() {
    // const loggedUser =JSON.parse(localStorage.getItem("loggedUser") || "") as string;
    console.log(2);

    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      const loggedUserParsed = JSON.parse(loggedUser);
      this.router.navigate(["app/home"]) 
    } else {
      this.router.navigate(["login"])
    }

  }
}
