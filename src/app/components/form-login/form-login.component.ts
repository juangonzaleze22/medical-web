import { HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { LoginErrorMessage } from '../../models/LoginErrorMessage';
import { PASSWORD_PATTERN } from '../../utils';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AuthResponse } from '../../models/Auth';
import { STATUS_AUTH } from '../../enums/auth.enum';
import { AlertService } from '../../services/alert.service';
import { GoogleService } from '../../services/google.service';

@Component({
  selector: 'app-form-login',
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
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss'
})

export class FormLoginComponent {

  loginForm!: FormGroup;
  loginValidationMessages!: LoginErrorMessage;
  hidePassword: boolean = true;
  loading: boolean = false;

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private alertService = inject(AlertService);
  private googleService = inject(GoogleService);


  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern(PASSWORD_PATTERN)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12)
      ]]
    });

    this.loginValidationMessages = {
      email: [
        { type: 'required', message: 'Este campo es requerido' },
        { type: 'pattern', message: 'No es un formato válido' },
        { type: 'EmailNotFound', message: 'Este email no existe' }
      ],
      password: [
        { type: 'required', message: 'Este campo es requerido' },
        { type: 'minlength', message: 'Mínimo 5 carácteres' },
        { type: 'maxlength', message: 'Máximo 12 carácteres' },
      ]
    };
  }

  onSubmit() {
    this.loading = true;
    if (!this.loginForm.invalid) {
      this.authService.authLogin(this.loginForm.value).subscribe({
        next: (response: AuthResponse) => {

          this.loading = false;

          if (response.status == STATUS_AUTH.NOUT_FOUND_USER) {
            this.alertService.showAlert({ message: 'Usuario no registrado' });
          }

          if (response.status == STATUS_AUTH.PASSWORD_INCORRECT) {
            this.alertService.showAlert({ message: 'Email o contraseña son incorrectos' });
          }


          if (response.status == 'success') {
            const { token, user } = response;
            this.alertService.showAlert({ message: `Welcome ${user.email}` });
            this.authService.logIn(token, user);
          }

          
          if (response.status == 'user_google') {
            this.alertService.showAlert({ message: `Este es un usuario no posee contraseña, por favor logueate con google` });
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

  async loginGoogle() {
    try {
      const result = await this.googleService.signInWithGoogleProvider();
      const user = await result.user;

      if (!user.email) { return }

      this.authService.authLoginWithGoogle(user.email).subscribe({
        next: ({token, user, status}: AuthResponse) => {
          if (status == STATUS_AUTH.NOUT_FOUND_USER) {
            this.alertService.showAlert({ message: 'Usuario no registrado' });
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
    return this.loginForm.controls;
  }

}
