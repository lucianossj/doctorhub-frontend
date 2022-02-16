import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NavigationService } from './services/navigation.service';



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
    NavigationService
  ]
})
export class SharedModule { }
