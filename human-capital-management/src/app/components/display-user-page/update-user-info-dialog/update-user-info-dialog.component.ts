import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { userInterface } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-update-user-info-dialog',
  templateUrl: './update-user-info-dialog.component.html',
  styleUrls: ['./update-user-info-dialog.component.scss']
})
export class UpdateUserInfoDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public user: userInterface) { }

  userToUpdate!: userInterface;

  ngOnInit(): void {
    this.userToUpdate = this.user;
  }
}
