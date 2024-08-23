import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-title-section',
  standalone: true,
  imports: [],
  templateUrl: './title-section.component.html',
  styleUrl: './title-section.component.scss'
})
export class TitleSectionComponent {

  @Input() title!: string;
  @Input() textAlign!: 'left' | 'center' | 'right';
  @Input() description!: string;

}
