import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavigationService } from './services/utils/navigation.service';
import { GenericDataService } from './services/data/generic-data.service';
import { GenericDataRestService } from './services/data/generic-data-rest.service';
import { AlertService } from './services/utils/alert.service';



@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent
  ],
  providers: [
    NavigationService,
    GenericDataService,
    GenericDataRestService,
    AlertService
  ]
})
export class SharedModule { }
