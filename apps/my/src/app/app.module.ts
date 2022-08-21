import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import {AppRoutingModule} from "./app-routing.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent] ,
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
