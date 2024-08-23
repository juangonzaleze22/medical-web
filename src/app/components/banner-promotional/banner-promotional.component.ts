import { Component } from '@angular/core';
import { CardCounterComponent } from '../card-counter/card-counter.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-banner-promotional',
  standalone: true,
  imports: [
    CardCounterComponent,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './banner-promotional.component.html',
  styleUrl: './banner-promotional.component.scss'
})
export class BannerPromotionalComponent {

}
