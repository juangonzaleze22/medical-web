import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { BannerComponent } from '../../components/banner/banner.component';
import { HelpComponent } from '../../components/help/help.component';
import { AboutComponent } from '../../components/about/about.component';
import { ReviewsComponent } from '../../components/reviews/reviews.component';
import { BannerPromotionalComponent } from '../../components/banner-promotional/banner-promotional.component';
import { ScrollSpyDirective } from '../../directives/scroll-spy.directive';
import { MapComponent } from '../../components/map/map.component';
import { AppointmentComponent } from '../../components/appointment/appointment.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    BannerComponent, 
    HelpComponent,
    AboutComponent,
    BannerPromotionalComponent,
    ReviewsComponent,
    ScrollSpyDirective,
    MapComponent,
    AppointmentComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
