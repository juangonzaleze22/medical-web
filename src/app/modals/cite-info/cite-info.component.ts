import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { Cite } from '../../models/Cite.model';
import { DIALOG_DATA } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WrapperModalComponent } from '../wrapper-modal/wrapper-modal.component';
import { CommonModule } from '@angular/common';
import { StatusChipComponent } from '../../pages/dashboard/components/status-chip/status-chip.component';

@Component({
  selector: 'app-cite-info',
  standalone: true,
  imports: [
    WrapperModalComponent,
    CommonModule,
    StatusChipComponent
  ],
  templateUrl: './cite-info.component.html',
  styleUrl: './cite-info.component.scss'
})
export class CiteInfoComponent implements OnInit{

  cite: Cite | undefined = inject(MAT_DIALOG_DATA);

  ngOnInit(): void {
    console.log("cite", this.cite)
  }

}
