import { Component } from '@angular/core';
import { LocalStorageKeysEnum } from './shared/local-storage/local-storage-keys.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'doctorhub-frontend';

  get isLogged(): boolean {
    return !!localStorage.getItem(LocalStorageKeysEnum.DOCTOR);
  }

}
