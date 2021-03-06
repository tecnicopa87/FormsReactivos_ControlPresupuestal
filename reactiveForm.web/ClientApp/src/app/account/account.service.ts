import { Injectable, Inject } from '@angular/core';
import { IUserInfo } from './user-info';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AccountService {
  
  private apiUrl = this.baseUrl + "api/account";
  public username: string;

  constructor(private http: HttpClient,@Inject('BASE_URL') private baseUrl:string) { }

  create(userinfo: IUserInfo): Observable<any> {
    return this.http.post<any>(this.apiUrl + "/Create", userinfo);
  }

  login(userinfo: IUserInfo) {
    localStorage.setItem ("user",userinfo.email);//*user    
    return this.http.post<any>(this.apiUrl + "/Login", userinfo);
  }

  logout() {
    localStorage.removeItem('user');//*user
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiration');
    return this.http.get("/app-nav-menu");
  }
  obtenerToken(): string {
    return localStorage.getItem("token");
  }
  obtenerExpirationToken(): string {
    return localStorage.getItem("tokenExpiration");
  }
  estaLogueado(): string {
    var exp = this.obtenerExpirationToken();
    if (!exp) {
      // el token no existe
      return "";
    }
    var now = new Date().getTime();
    var dateExp = new Date(exp);

    if (now >= dateExp.getTime()) {
      // ya expiró token
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      return "";//false;
    } else {
      return localStorage.getItem("user");//true  //*user
    }

  }
  
}
