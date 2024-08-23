import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Cite } from '../../../../models/Cite.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-card-cite',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    DatePipe
  ],
  templateUrl: './card-cite.component.html',
  styleUrl: './card-cite.component.scss'
})
export class CardCiteComponent {

  @Input() cite!: Cite;

}
