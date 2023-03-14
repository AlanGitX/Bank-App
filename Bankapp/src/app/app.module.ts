import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import{HttpClientModule } from '@angular/common/http';
import { MiniStatementComponent } from './mini-statement/mini-statement.component';
import { FilerPipe } from './filer.pipe';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    MiniStatementComponent,
    FilerPipe,
    DeleteConfirmComponent,
    PagenotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,ReactiveFormsModule,HttpClientModule,  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
