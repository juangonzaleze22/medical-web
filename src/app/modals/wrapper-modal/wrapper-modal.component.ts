import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'wrapper-modal',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatToolbarModule
  ],
  templateUrl: './wrapper-modal.component.html',
  styleUrl: './wrapper-modal.component.scss'
})

export class WrapperModalComponent {

  @Input() title: string | undefined;
  @Input() buttonsActionsHide: boolean | undefined;
  @Input() reason_cancel?: string | undefined;

  private dialogRef = inject(MatDialogRef<WrapperModalComponent>);

  closeDialog(confirmed: boolean = false, ): void {
    this.dialogRef.close({confirmed, reason_cancel: this.reason_cancel});
  }

  closeModalHeadButton() {
    this.dialogRef.close()
  }

}
