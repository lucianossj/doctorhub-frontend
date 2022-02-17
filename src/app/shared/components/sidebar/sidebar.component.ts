import { Component, OnInit } from '@angular/core';
import { LocalStorageKeysEnum } from '../../local-storage/local-storage-keys.enum';
import { AlertService } from '../../services/utils/alert.service';
import { NavigationService } from '../../services/utils/navigation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private navigationService: NavigationService,
    private alert: AlertService
  ) { }

  public ngOnInit(): void {
  }

  public navigateTo(url: string): void {
    this.navigationService.navigateTo(url);
  }

  public logout(): void {
    localStorage.setItem(LocalStorageKeysEnum.DOCTOR, '');
    this.alert.success('Até mais!', '');
    this.navigateTo('login');
  }

}
