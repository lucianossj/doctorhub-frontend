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

  public confirmation(alertTitle: string, denyButtonText: string): Promise<boolean> {
    return Swal.fire({
      title: alertTitle,
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      denyButtonText: denyButtonText,
      cancelButtonText: 'Cancelar'
    }).then(result => result.isDenied)
  }

}
