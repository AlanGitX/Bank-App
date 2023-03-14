import { Component } from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  errorMsg:string=''
  sucessMsg:boolean = false

  Loginform = this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//validations in Angular.
    pswd:['', [Validators.required,Validators.pattern('[0-9A-Za-z]*')]]
  })

  
  constructor(private fb:FormBuilder, private api:ApiService,private router:Router){}
  logindata(){
    if(this.Loginform.valid){
      let acno = this.Loginform.value.acno
      let pswd =this.Loginform.value.pswd
      this.api.login(acno,pswd).subscribe((data:any)=>{
        this.sucessMsg=true;
//save username. 
        localStorage.setItem("username",data.username)
//save account number; 
localStorage.setItem("currentAcno",JSON.stringify(data.currentAcno))

//token

localStorage.setItem("token",data.token)


        setTimeout(()=>{
          this.router.navigateByUrl('dashboard')

        },2000)

      },
      (data:any)=>{
        this.errorMsg = data.error.message;
        console.log(this.errorMsg);
        

      })
    }
    else{
      alert('invalid')
    }
    }

  }



