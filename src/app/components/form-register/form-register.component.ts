import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthModel, AuthResponse } from '../../models/Auth';
import { STATUS_AUTH } from '../../enums/auth.enum';
import { AlertService } from '../../services/alert.service';
import { RegisterUserErrorMessage } from '../../models/RegisterUserErrorMessage';
import { PASSWORD_PATTERN } from '../../utils';
import { GoogleService } from '../../services/google.service';

@Component({
  selector: 'app-form-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './form-register.component.html',
  styleUrl: './form-register.component.scss'
})
export class FormRegisterComponent implements OnInit {

  registerForm!: FormGroup;
  hidePassword: boolean = true;
  hidecPassword: boolean = true;
  loading: boolean = false;
  RegisterValidationMessages!: RegisterUserErrorMessage;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private googleService = inject(GoogleService);


  ngOnInit(): void {

    this.registerForm = this.fb.group({
      displayName: [''],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(PASSWORD_PATTERN)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12)
      ]],
      cpassword: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12),
      ]],
    });

    this.RegisterValidationMessages = {
      displayName: [
        { type: 'required', message: 'Este campo es requerido' },
        { type: 'pattern', message: 'No es un formato válido' },
        { type: 'EmailNotFound', message: 'Este email no existe' }
      ],
      email: [
        { type: 'required', message: 'Este campo es requerido' },
        { type: 'pattern', message: 'No es un formato válido' },
        { type: 'EmailNotFound', message: 'Este email no existe' }
      ],
      password: [
        { type: 'required', message: 'Este campo es requerido' },
        { type: 'minlength', message: 'Mínimo 5 carácteres' },
        { type: 'maxlength', message: 'Máximo 12 carácteres' },
      ],
      cpassword: [
        { type: 'required', message: 'Este campo es requerido' },
        { type: 'minlength', message: 'Mínimo 5 caracteres' },
        { type: 'maxlength', message: 'Máximo 12 caracteres' },
        { type: 'notEqual', message: 'Las contraseñas no coinciden' }
      ],
    };

    this.registerForm.valueChanges.subscribe((response: any) => {
      const { password, cpassword } = response;
      if (password != cpassword) {
        const errors = this.registerForm.controls['cpassword'].errors || {};
        errors['notEqual'] = true;
        this.registerForm.controls['cpassword'].setErrors(errors);
      }
    })
  }

  onSubmit() {
    this.loading = true;
    if (!this.registerForm.invalid) {
      this.authService.authRegister(this.registerForm.value).subscribe({
        next: (response: AuthResponse) => {

          this.loading = false;

          if (response.status == STATUS_AUTH.ALREADY_USER) {
            this.alertService.showAlert({ message: 'Este usuario ya existe' });
          }

          if (response.status == 'success') {
            const { token, user } = response;
            this.alertService.showAlert({ message: `Welcome ${user.email}` });
            this.authService.logIn(token, user);
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

  async registerWithGoogle() {
    try {
      const result = await this.googleService.signInWithGoogleProvider();

      if (!result) { return}

      const {displayName, email, photoURL} = await result.user;

      const dataSend = { 
        displayName: displayName ?? "",
        email: email ?? "",
        photoURL: photoURL ?? "",
      }


      this.authService.authRegisterWithGoogle(dataSend).subscribe({
        next: ({ token, user, status }: AuthResponse) => {

          
          if (status == STATUS_AUTH.ALREADY_USER) {
            this.alertService.showAlert({ message: 'Este usuario ya existe' });
            return
          }

          if (status == 'success') {
            this.alertService.showAlert({ message: `Welcome ${user.email}` });
            this.authService.logIn(token, user);
          }

        },
        error: (error: HttpErrorResponse) => {
          this.alertService.showAlert({ message: error.message });
        },
      })
     
    } catch (error) {
      this.alertService.showAlert({ message: `Error:  ${error}` });
    } 
  } 

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }

}
