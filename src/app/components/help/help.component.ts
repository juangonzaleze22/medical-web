import { Component } from '@angular/core';
import { TitleSectionComponent } from '../title-section/title-section.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    TitleSectionComponent
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.scss'
})
export class HelpComponent {

}
