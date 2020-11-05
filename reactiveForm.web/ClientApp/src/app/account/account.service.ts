import { Injectable, Inject } from '@angular/core';
import { IUserInfo } from './user-info';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {
  
  private apiUrl = this.baseUrl + "api/account";

  constructor(private http: HttpClient,@Inject('BASE_URL') private baseUrl:string) { }

  create(userinfo: IUserInfo): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/Create", userinfo);
  }

  login(userinfo: IUserInfo) {
    return this.http.post<any>(this.apiUrl + "/Login", userinfo);
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');    
  }
  obtenerToken(): string {
    return localStorage.getItem("token");
  }
  obtenerExpirationToken(): string {
    return localStorage.getItem("tokenExpiration");
  }
  estaLogueado(): boolean {
    var exp = this.obtenerExpirationToken();
    if (!exp) {
      // el token no existe
      return false;
    }
    var now = new Date().getTime();
    var dateExp = new Date(exp);

    if (now >= dateExp.getTime()) {
      // ya expiró token
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      return false;
    } else {
      return true;
    }

  }
}
