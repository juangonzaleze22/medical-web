import { Component, inject } from '@angular/core';
import { MatMenuModule} from '@angular/material/menu';
import { MatButtonModule} from '@angular/material/button';
import { AuthService } from '../../../../services/auth.service';
import { MatIconModule } from '@angular/material/icon';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MatButtonModule,
    MatButtonModule, 
    MatMenuModule,
    MatIconModule,
    NgOptimizedImage

  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})

export class NavbarComponent {

  private authService =  inject(AuthService);
  public user = this.authService.getUser();

  handleLogout() {
    this.authService.logOut();
  }

}
