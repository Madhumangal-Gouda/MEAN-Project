import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './Share/material.module';
import { DialogComponent } from './dialog/dialog.component';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AddformComponent } from './addform/addform.component';





@NgModule({
  declarations: [
    AppComponent,
    DialogComponent,
    LoginComponent,
    AddformComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule  
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
