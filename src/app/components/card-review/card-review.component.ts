import { Component, Input } from '@angular/core';
import { Review } from '../../models/Review';

@Component({
  selector: 'app-card-review',
  standalone: true,
  imports: [],
  templateUrl: './card-review.component.html',
  styleUrl: './card-review.component.scss'
})
export class CardReviewComponent {

  @Input() review: Review | undefined = undefined

}
