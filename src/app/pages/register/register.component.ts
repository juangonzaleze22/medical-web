import { Component } from '@angular/core';
import { WrapperAuthComponent } from '../../components/wrapper-auth/wrapper-auth.component';
import { FormRegisterComponent } from '../../components/form-register/form-register.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    WrapperAuthComponent,
    FormRegisterComponent
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

}
