import { Component } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { FormLoginComponent } from '../form-login/form-login.component';
import { TitleSectionComponent } from '../title-section/title-section.component';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    MapComponent,
    FormLoginComponent,
    TitleSectionComponent
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.scss'
})
export class AppointmentComponent {

}
