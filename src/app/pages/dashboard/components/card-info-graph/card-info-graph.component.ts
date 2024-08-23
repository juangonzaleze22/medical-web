import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-info-graph',
  standalone: true,
  imports: [
    MatIconModule
  ],
  templateUrl: './card-info-graph.component.html',
  styleUrl: './card-info-graph.component.scss'
})
export class CardInfoGraphComponent {
  
  @Input({ required: true }) title!: string
  @Input({ required: true }) icon!: string
  @Input({ required: true }) value!: string

}
