import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-title-section',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './title-section.component.html',
  styleUrl: './title-section.component.scss'
})
export class TitleSectionComponent {

  @Input() title: string = '';
  @Input() button: string = '';
  @Input() iconButton: string = ''

  @Output() clicked = new EventEmitter<boolean>();

  onClickButton() {
    this.clicked.emit(true);
  }
  
}
