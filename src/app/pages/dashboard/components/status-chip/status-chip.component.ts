import { Component, Input } from '@angular/core';
import { STATUS_CITE } from '../../../../enums/cite.enum';
import { MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-chip',
  standalone: true,
  imports: [
    MatChipsModule,
    CommonModule
  ],
  templateUrl: './status-chip.component.html',
  styleUrl: './status-chip.component.scss'
})
export class StatusChipComponent {

  @Input() status: string | undefined;

  status_cites = STATUS_CITE
  

}
