import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { IPersona } from './personas';

@Injectable()
export class PersonasService {

  private apiURL = this.baseUrl + "api/personas";

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl:string) { }

  getPersonas(): Observable<IPersona[]> {
    return this.http.get<IPersona[]>(this.apiURL);
  }
  getPersona(personId: string): Observable<IPersona> {
    return this.http.get<IPersona>(this.apiURL+'/'+personId);
  }

  createPersona(persona: IPersona): Observable<IPersona> {
    return this.http.post<IPersona>(this.apiURL, persona);
  }

  updatePersona(persona: IPersona): Observable<IPersona> {
    return this.http.put<IPersona>(this.apiURL, persona);
  }

  deletePersona(personId: number): Observable<IPersona> {
    return this.http.delete<IPersona>(this.apiURL + "/" + personId);
  }
}
