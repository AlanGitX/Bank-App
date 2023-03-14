import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../Services/api.service';
import party from 'party-js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: string = '';
  acno: string = '';
  Iscollapse: boolean = true;
  currentAcno: number = 0;
  balance: number = 0;
  depositMsg: string = '';
  Fundsuccessmessage: string = '';
  Funderrormessage: string = '';
  confirmMsg: boolean = true;
  condition: boolean = true;
  deleteSpinnerdiv:boolean = false;
  depositForm = this.fb.group({
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  });

  fundtransferForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]], //validations in Angular.
    pswd: ['', [Validators.required, Validators.pattern('[0-9A-Za-z]*')]],
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],
  });

  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    if (!localStorage.getItem('token')) {
      alert('Login');
      this.router.navigateByUrl('');
    }

    if (localStorage.getItem('username')) {
      this.user = localStorage.getItem('username') || ' ';
    }
    if (localStorage.getItem('currentAcno')) {
      this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || ' ');
    }
  }
  collapse() {
    this.Iscollapse = !this.Iscollapse;
  }

  getBalance() {
    this.api.getBalance(this.currentAcno).subscribe((result: any) => {
      this.balance = result.balance;
      console.log(result);
    });
  }
  depositdata() {
    if (this.depositForm.valid) {
      let amount = this.depositForm.value.amount;
      this.currentAcno = JSON.parse(localStorage.getItem('currentAcno') || ' ');
      this.api.depositdata(this.currentAcno, amount).subscribe(
        (result: any) => {
          console.log(result);
          this.depositMsg = result.message;
          setTimeout(() => {
            this.depositMsg = '';
            this.depositForm.reset();
          }, 5000);
        },
        (result: any) => {
          this.depositMsg = result.error.message;
          setTimeout(() => {
            this.depositMsg = '';
          }, 3000);
        }
      );
    } else {
      alert('invalid form.');
    }
  }

  //showconfiti.

  showconfetti(source: any) {
    party.confetti(source);
  }

  transfer() {
    if (this.fundtransferForm.valid) {
      let toAcno = this.fundtransferForm.value.acno;
      let pswd = this.fundtransferForm.value.pswd;
      let amount = this.fundtransferForm.value.amount;
      this.api.fundTransfer(toAcno, pswd, amount).subscribe(
        (result: any) => {
          this.Fundsuccessmessage = result.message;
          setTimeout(() => {
            this.Fundsuccessmessage = '';
          }, 3000);
        },
        //client error;
        (result: any) => {
          this.Funderrormessage = result.error.message;
          setTimeout(() => {
            this.Funderrormessage = '';
          }, 3000);
        }
      );
    } else {
      alert('innvalid form');
    }
  }

  //miniStatement

  miniStatement() {
    this.router.navigateByUrl('MiniStatement');
  }

  //clear fund transfer form.
  clearfundTransferform() {
    this.Funderrormessage = '';
    this.Fundsuccessmessage = '';
    this.fundtransferForm.reset();
  }

  //logout

  logout() {
    this.condition = false;
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('currentAcno');

    //navigate to login page.
    setTimeout(() => {
      this.router.navigateByUrl('');
      this.condition = true;
    }, 4000);
  }

  deleteAccount() {
    this.acno = localStorage.getItem('currentAcno')||"";
    this.confirmMsg = false;
  }

  onCancel() {
    this.acno = '';
    this.confirmMsg = true;
  }

  onDelete(event: any) {
    let deleteAcc = JSON.parse(event)
    this.api.deleteAccount(deleteAcc)
    .subscribe((result:any)=>{
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('currentAcno');
      this.deleteSpinnerdiv = true
      this.acno = '';


      setTimeout(() => {
        this.router.navigateByUrl('');
        this.deleteSpinnerdiv = false
      }, 4000);

    },
    ((result:any)=>{
      alert(result.error.message)
    })
    )
  }
}
