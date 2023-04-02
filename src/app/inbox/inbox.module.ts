import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InboxComponent } from './inbox/inbox.component';
import { AttackReportComponent } from './attack-report/attack-report.component';



@NgModule({
  declarations: [
    InboxComponent,
    AttackReportComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InboxModule { }
