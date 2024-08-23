import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterEvent, RouterLink } from '@angular/router';

@Component({
  selector: 'app-wrapper-auth',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink
  ],
  templateUrl: './wrapper-auth.component.html',
  styleUrl: './wrapper-auth.component.scss'
})
export class WrapperAuthComponent {

  private location: Location = inject(Location)

  goBack(): void {
    this.location.back();
  }

}
