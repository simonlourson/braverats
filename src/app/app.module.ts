import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BraveratsModule } from './braverats/braverats.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BraveratsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
