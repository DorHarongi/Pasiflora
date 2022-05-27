import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPanelComponent } from './main-panel/main-panel.component';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { RightToolbarComponent } from './right-toolbar/right-toolbar.component';



@NgModule({
  declarations: [
    MainPanelComponent,
    TopToolbarComponent,
    RightToolbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    MainPanelComponent
  ]
})
export class MainPanelModule { }
