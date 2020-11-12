import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { EventoT } from './eventotmp';

@Injectable()
export class EventosService {

  private apiURL = this.baseUrl + "api/Evento";//En el back está: Route("api/[controller]"), se podría poner api/MisEventos

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }

  agregaEvento(eventtmp: EventoT): Observable<EventoT>{
    console.log('entró a servicioEvento' + this.apiURL);    
     return this.http.post<EventoT>(this.apiURL, eventtmp);
  }

  zonasEvento(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/ZonasEvento');
  }
}
