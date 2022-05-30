import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserInformationService } from './user-information.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [UserInformationService]
})
export class UserInformationModule { }
