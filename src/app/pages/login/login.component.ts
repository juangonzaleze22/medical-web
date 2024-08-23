import { Component } from '@angular/core';
import { FormLoginComponent } from '../../components/form-login/form-login.component';
import { RouterLink } from '@angular/router';
import { WrapperAuthComponent } from '../../components/wrapper-auth/wrapper-auth.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormLoginComponent,
    RouterLink,
    WrapperAuthComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

}
