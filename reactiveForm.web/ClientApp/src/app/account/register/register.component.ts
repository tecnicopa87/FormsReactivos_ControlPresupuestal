import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AccountService } from '../account.service';
import { IUserInfo } from '../user-Info';
import { Router } from '@angular/router';
import { userInfo } from 'os';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb: FormBuilder, private accountService: AccountService, private ruoter: Router) { }
  formGroup: FormGroup;

  ngOnInit() {
    this.formGroup = this.fb.group({
      email: '',
      password: '',
    });
  }

  loguearse() {
    let userinfo: IUserInfo = Object.assign({}, this.formGroup.value);
    this.accountService.login(userinfo).subscribe(token => this.recibirToken(token),
      error => console.log(error));
  }

  registrarse() {
    let userinfo: IUserInfo = Object.assign({}, this.formGroup.value);
    this.accountService.create(userinfo).subscribe(token => this.recibirToken(token),
      error => alert(error));//  console.warn()
  }

  recibirToken(token) {
    console.log(token.token);
    localStorage.setItem('token', token.token);
    localStorage.setItem('tokenExpiration', token.expiration);
    this.ruoter.navigate(['']);
  }

}
