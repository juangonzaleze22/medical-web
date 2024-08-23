import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { Cite, MedicalResponse, ResponseCiteUpdate } from '../../../../models/Cite.model';
import { DatePipe, JsonPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { StatusChipComponent } from '../status-chip/status-chip.component';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../../../models/User.model';
import { AuthService } from '../../../../services/auth.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CitesService } from '../../../../services/cites.service';
import { AlertService } from '../../../../services/alert.service';
import { STATUS_CITE, STATUS_CITE_RESPONSE } from '../../../../enums/cite.enum';
import { CONFIG_MODAL } from '../../../../const';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../../modals/confirm/confirm.component';
import { FormCancelledCiteComponent } from "../form-cancelled-cite/form-cancelled-cite.component";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { InputEditorComponent } from '../../../../components/input-editor/input-editor.component';

@Component({
  selector: 'app-cite-details',
  standalone: true,
  imports: [
    JsonPipe,
    MatCardModule,
    MatIconModule,
    DatePipe,
    StatusChipComponent,
    MatInputModule,
    MatToolbarModule,
    MatButtonModule,
    FormCancelledCiteComponent,
    ReactiveFormsModule,
    MatFormFieldModule,
    InputEditorComponent
  ],
  templateUrl: './cite-details.component.html',
  styleUrl: './cite-details.component.scss'
})
export class CiteDetailsComponent implements OnInit{

  @Input() cite!: Cite | null;
  @Input() typeCite: string = STATUS_CITE.PENDING;
  @Output() onChangeUpdateCite = new EventEmitter<Cite>();

  authService = inject(AuthService);
  citesService = inject(CitesService);
  alertService = inject(AlertService);
  fb  = inject(FormBuilder)
  dialog = inject(MatDialog)

  user: User | undefined = this.authService.getUser();
  datePipe = new DatePipe('en-US');
  formfinalized!: FormGroup;
  status_cite = STATUS_CITE;


  ngOnInit(): void {
    this.formfinalized = this.fb.group({
      observation: [''],
      recipe: ['']
    });
  }

  handleActionCite(value: boolean) {
    const status = value ? STATUS_CITE.APPROVED : STATUS_CITE.CANCELLED;

    if (this.cite) {
      this.citesService.postUpdateCite({ status }, this.cite?._id).subscribe({
        next: (response: ResponseCiteUpdate) => {
          console.log("response update cite", response);
          const { status, data } = response;
          const date = this.datePipe.transform(data.date, 'M/d/yy')
          if (status == STATUS_CITE_RESPONSE.SUCCESS) {
            const message = value ? `La cita ha sido aceptada para el dia ${date}` : `La cita ha sido rechazada`
            this.onChangeUpdateCite.emit(data)
            this.alertService.showAlert({ message });
          }

        },
        error: (error: ErrorCallback) => {
          console.log("error, error", error)
          this.alertService.showAlert({ message: "Ha ocurrido un error" });
        }
      })
    }

  }

  handleConfirmAction(value: boolean) {
    const dialogRef = this.dialog.open(ConfirmComponent, {
      ...CONFIG_MODAL,
      width: '420px',
      data: {
        text: `¿Estás seguro que desea ${value ? 'confirmar' : 'rechazar'} esta cita médica?`,
        actionType: value ? 'confirm' : 'cancel',
      }
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.handleActionCite(value);
        /* this.getAllCite(); */
      }
    });
  }

  onSubmitFinalized(){ 

    const DataToSend = {
      status: STATUS_CITE.FINISHED,
      medical_response: this.formfinalized.value as MedicalResponse
    }

    if (!this.cite) return 

    this.citesService.postUpdateCite(DataToSend, this.cite?._id).subscribe({
      next: (response: ResponseCiteUpdate ) => {
        const {status, data} = response
        if (status == STATUS_CITE_RESPONSE.SUCCESS) {
          const message = `Cita finalizada con exito!`
          this.alertService.showAlert({ message });
          this.onChangeUpdateCite.emit(data)
        }
      },
      error: (error: ErrorCallback) => {
        console.log("error, error", error)
      }
    })
  }

}
