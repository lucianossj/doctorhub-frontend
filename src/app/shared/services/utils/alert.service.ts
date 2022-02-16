import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable()
export class AlertService {

  public success(alertTitle: string, alertText: string): void {
    Swal.fire({
      title: alertTitle,
      text: alertText,
      icon: 'success',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    });
  }

  public warning(alertTitle: string, alertText: string): void {
    Swal.fire({
      title: alertTitle,
      text: alertText,
      icon: 'warning',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    });
  }

  public error(alertTitle: string, alertText: string): void {
    Swal.fire({
      title: alertTitle,
      text: alertText,
      icon: 'error',
      showCancelButton: false,
      confirmButtonText: 'Ok',
    });
  }

}
