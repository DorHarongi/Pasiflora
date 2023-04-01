import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsComponent } from './reports/reports.component';
import { InboxComponent } from './inbox/inbox.component';
import { MessagesComponent } from './messages/messages.component';



@NgModule({
  declarations: [
    ReportsComponent,
    InboxComponent,
    MessagesComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InboxModule { }
