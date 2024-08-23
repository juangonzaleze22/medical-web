import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Cite } from '../../../../models/Cite.model';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { StatusChipComponent } from "../status-chip/status-chip.component";
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-card-appointment',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    CommonModule,
    StatusChipComponent,
    StatusChipComponent
],
  templateUrl: './card-appointment.component.html',
  styleUrl: './card-appointment.component.scss'
})

export class CardAppointmentComponent implements OnInit{

  @Input() cite: (Cite) | undefined = undefined
  @Output() deleteClicked = new EventEmitter<Event>();
  @Output() confirmClicked = new EventEmitter<Event>();

  userInfo = inject(AuthService)

  ngOnInit(): void {
  }

  handleDeleteModal(event: Event){ 
    event.stopPropagation();
    this.deleteClicked.emit(event);
    
  }

  handleConfirmModal(event: Event){ 
    event.stopPropagation();
    this.confirmClicked.emit(event);
  }

}
