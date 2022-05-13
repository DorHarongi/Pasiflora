import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPanelModule } from './main-panel/main-panel.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, MainPanelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
