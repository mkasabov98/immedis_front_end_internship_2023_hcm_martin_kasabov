import { Component, Input } from '@angular/core';
import { userInterface } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-user-details-card',
  templateUrl: './user-details-card.component.html',
  styleUrls: ['./user-details-card.component.scss']
})
export class UserDetailsCardComponent {
  @Input() user!: userInterface;
}
