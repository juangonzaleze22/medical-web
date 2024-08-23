import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';

interface SideButtonsOptions {
  name: string
  icon: string
  url: string
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatListModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})



export class SidebarComponent implements OnInit{

  userInfo = inject(AuthService).getUser();

  options: SideButtonsOptions[] = [
    {
      name: 'Home',
      icon: 'home',
      url: 'home'
    },
    {
      name: 'Calendary',
      icon: 'date_range',
      url: 'calendary'
    },
  
  ]

  ngOnInit(): void {
    if (this.userInfo?.isAdmin){ 
      this.options.push(
        {
          name: 'Citas',
          icon: 'request_page',
          url: 'requests'
        },
      )
    }else{ 
      this.options.push(
        {
          name: 'Mis Citas',
          icon: 'personal_injury',
          url: 'my-cites'
        }
      )
    }
  }

}
