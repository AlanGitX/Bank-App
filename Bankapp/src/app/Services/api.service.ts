import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
const options = {
  headers: new HttpHeaders(),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  //register
  register(uname: any, acno: any, pswd: any) {
    const body = {
      uname,
      acno,
      pswd,
    };
    //api call.

    return this.http.post('http://localhost:3000/register', body);
  }
  //login page.

  login(acno: any, pswd: any) {
    const body = {
      acno,
      pswd,
    };

    return this.http.post('http://localhost:3000/login', body);
  }
  //append a token
  appendToken() {
    //fetch token from local storage.
    const token = localStorage.getItem('token') || ' ';

    let headers = new HttpHeaders();
    if (token) {
      headers = headers.append('access-token', token);
      options.headers = headers;
    }
    return options;
  }

  //getbalance.

  getBalance(acno: any) {
    return this.http.get(
      'http://localhost:3000/getBalance/' + acno,
      this.appendToken()
    );
  }

  depositdata(acno: any, amount: any) {
    const body = {
      acno,
      amount,
    };
    return this.http.post(
      'http://localhost:3000/deposit',
      body,
      this.appendToken()
    );
  }

  //fundtransfer

  fundTransfer(toAcno: any, pswd: any, amount: any) {
    const body = {
      toAcno,
      pswd,
      amount,
    };
    return this.http.post(
      'http://localhost:3000/fundTransfer',
      body,
      this.appendToken()
    );
  }

  getAllTransactions() {
    return this.http.get(
      'http://localhost:3000/all-transactions',
      this.appendToken()
    );
  }

  //deleteaccount

  deleteAccount(acno: number) {
    return this.http.delete(
      'http://localhost:3000/delete-account/' + acno,
      this.appendToken()
    );
  }
}
