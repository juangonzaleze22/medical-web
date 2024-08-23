import { Injectable, inject } from '@angular/core';
import {
  MatSnackBar,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})

export class AlertService {

  alertService = inject(MatSnackBar);

  showAlert({message, text = 'Cerrar'  } : {message: string, text?: string}) { 
    this.alertService.open(message, text, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    }
  );
  }

}
