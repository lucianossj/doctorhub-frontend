import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../services/navigation.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private navigationService: NavigationService
  ) { }

  public ngOnInit(): void {
  }

  public navigateTo(url: string): void {
    this.navigationService.navigateTo(url);
  }

}
