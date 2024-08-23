import { Component, Inject, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { fromEvent, throttleTime } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  showContentNav: boolean = false;
  router = inject(Router);
  authService = inject(AuthService)

  pathAuths: string[] = ['/login', '/register', '/dashboard'];
  
  constructor() {
    fromEvent(window, 'scroll')
      .pipe(throttleTime(100))
      .subscribe((event) => this.onWindowScroll(event));
  }

  onWindowScroll(event: Event) {
    let scrollPosition = window.scrollY || document.documentElement.scrollTop;
    scrollPosition = scrollPosition + 200;

    const sections: any = document.querySelectorAll('section.spy');

    sections.forEach((section: HTMLElement) => {
      if (
        section.offsetTop <= scrollPosition &&
        section.offsetTop + section.offsetHeight > scrollPosition
      ) {
        let navLinks: any = document.querySelectorAll('.navbar a');
        navLinks.forEach((link: HTMLAnchorElement) => {
          if (link.href.includes(section.id)) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.url;
         this.showContentNav = this.pathAuths.some(authPath => url.startsWith(authPath));;
      }
    });
  }
 
}
