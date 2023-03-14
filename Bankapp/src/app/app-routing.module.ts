import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MiniStatementComponent } from './mini-statement/mini-statement.component';
import { PagenotFoundComponent } from './pagenot-found/pagenot-found.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'', component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  }, 
  {
    path:'dashboard',component:DashboardComponent
  },
  {
    path:'MiniStatement',component:MiniStatementComponent
  },
  {
    path:'**',component:PagenotFoundComponent
  }


  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
