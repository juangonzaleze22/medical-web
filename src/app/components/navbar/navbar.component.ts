import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  isOpenMenu: boolean = false;
  isScrolled = false;

  isLogged = inject(AuthService).$isLogged;
  authService = inject(AuthService);


  @HostListener('window:scroll', ['$event'])
  onScroll($event: Event) {
    this.isScrolled = window.scrollY > 0; // Check if scrolled past top
  }

  logOut(){ 
    this.authService.logOut()
  }

}
