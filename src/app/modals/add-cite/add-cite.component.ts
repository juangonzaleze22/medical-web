import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { WrapperModalComponent } from '../wrapper-modal/wrapper-modal.component';
import { TIME_AVAILABLE } from '../../const';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../../services/auth.service';
import { CitesService } from '../../services/cites.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../services/alert.service';
import { CiteDataSend, ResponseCite } from '../../models/Cite.model';
import { STATUS_CITE_RESPONSE } from '../../enums/cite.enum';
import { NgxDropzoneModule } from 'ngx-dropzone';

interface PropsAddCite { 
  date: string;
  time: string
}

@Component({
  selector: 'app-add-cite',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule,
    WrapperModalComponent,
    MatSelectModule,
    NgxDropzoneModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './add-cite.component.html',
  styleUrl: './add-cite.component.scss'
})
export class AddCiteComponent implements OnInit{

  data: PropsAddCite = inject(MAT_DIALOG_DATA);
  listSelectTime = TIME_AVAILABLE
  
  formCite!: FormGroup;
  addValidationMessages!: any;
  loading: boolean = false;

  //images
  files: File[] = [];
  preview: string | undefined;

  
  private authService = inject(AuthService);
  private citeService = inject(CitesService);
  private alertService = inject(AlertService);
  private fb = inject(FormBuilder);
  private dialogRef = inject(MatDialogRef<AddCiteComponent>);

  ngOnInit(): void {

    this.formCite = this.fb.group({
      title: ['', [
        Validators.required,
      ]],
      description: ['', []]
    });

    this.addValidationMessages = {
      title: [
        { type: 'required', message: 'Este campo es requerido' },
      ],
    };
  }

  onSubmit() {

    const { title, description } = this.formCite.value;
    const { date, time} = this.data;

    const  idUserReserved = this.authService.dataUser?._id
    const dateFormat = date+ 'T' + time;

    const dataSend: CiteDataSend = { 
      title,
      description,
      date: dateFormat,
      idUserReserved
    }

    this.loading = true;

    if (!this.formCite.invalid) {
      this.citeService.postAddCite(dataSend).subscribe({
        next: (response: ResponseCite) => {
          console.log('response', response)
          this.loading = false;

          if (response.status == STATUS_CITE_RESPONSE.SAME_DATE_ERROR) {
            this.alertService.showAlert({ message: 'Ya hay una reserva para esa fecha, por favor elija un dia u hora disponible' });
          }

          if (response.status == STATUS_CITE_RESPONSE.USER_NOT_FOUND) {
            this.alertService.showAlert({ message: 'Usuario no encontrado' });
          }

          if (response.status == STATUS_CITE_RESPONSE.SUCCESS) {
            this.alertService.showAlert({ message: 'Solicitud de cita ha sido creada correctamente.' });
            this.dialogRef.close(true);
          }

        },
        error: (error: HttpErrorResponse) => {
          this.loading = false;
          this.alertService.showAlert({ message: error.message });
        },
        complete: () => {
          this.loading = false;
        }
      })
    }
  }

  
  onSelect(event: any) {
    const file = event.addedFiles[0];
    const maxSize = 5 * 1024 * 1024; // 5 MB en bytes
  
    if (file.size > maxSize) {
      alert('El archivo es demasiado grande. El tamaño máximo permitido es 5 MB.');
      return;
    }
  
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      alert('Por favor, selecciona un archivo de imagen (JPEG, PNG o WEBP).');
      return;
    }
  
    // Resto del código para leer el archivo y mostrar la vista previa
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.preview = reader.result as string;
    };
  }

  onRemove($event: Event) {
    $event.stopPropagation();
    this.preview = undefined;
    this.files = [];
  }

  get f(): { [key: string]: AbstractControl } {
    return this.formCite.controls;
  }

}
