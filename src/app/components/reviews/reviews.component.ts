import { Component } from '@angular/core';
import { TitleSectionComponent } from '../title-section/title-section.component';
import { REVIEWS } from '../../mocks/reviews';
import { Review } from '../../models/Review';
import { CardReviewComponent } from '../card-review/card-review.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [
    TitleSectionComponent,
    CardReviewComponent,
    CommonModule
  ],
  templateUrl: './reviews.component.html',
  styleUrl: './reviews.component.scss'
})
export class ReviewsComponent {

  reviews: Review[] = REVIEWS;

}
