import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent } from '@angular/common/http';
import { AccountService } from '../account/account.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private apiauthService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    var token = this.apiauthService.obtenerToken(); //quien da el dato como usuario
    
    //if (token!=null) {
      request = request.clone({
        setHeaders: { // De esta forma se va mandar Autorization en todos los headers
          Authorization: `Bearer ${token}`
        }
      });
    //}
    return next.handle(request);// request siempre y cuando tenga sesion
  }
}
