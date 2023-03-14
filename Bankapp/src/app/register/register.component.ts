import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerform = this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[0-9A-Za-z]*')]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],//validations in Angular.
    pswd:['', [Validators.required,Validators.pattern('[0-9A-Za-z]*')]]
  })

  
  constructor(private fb:FormBuilder, private api:ApiService,private router:Router){}
  logindata(){
    if(this.registerform.valid){
      // alert('Forn is valid!!')
      let acno = this.registerform.value.acno
      let pswd =this.registerform.value.pswd
      let uname=this.registerform.value.uname
      this.api.register(uname,acno,pswd).subscribe((data:any)=>{
        alert(data.message)
        this.router.navigateByUrl('')

        
      },
      (data:any)=>{
        alert(data.error.message)
      })
    }
    else{
      alert('invalid')
    }

  }


}
