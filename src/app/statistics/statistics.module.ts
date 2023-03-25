import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics/statistics.component';
import { MainPanelModule } from '../main-panel/main-panel.module';



@NgModule({
  declarations: [
    StatisticsComponent
  ],
  imports: [
    MainPanelModule,
    CommonModule,
  ],
  exports: [
    StatisticsComponent
  ]
})
export class StatisticsModule { }
