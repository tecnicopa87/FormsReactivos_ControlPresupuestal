import { Component, OnInit } from '@angular/core';
import { IPersona } from './personas';
import { PersonasService } from './personas.service';
import { error } from 'protractor';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styleUrls: ['./personas.component.css']
})
export class PersonasComponent implements OnInit {

  personas: IPersona[];
  constructor(private personasService: PersonasService) {
    
  }

  ngOnInit() {
    this.personasService.getPersonas()
      .subscribe(pws => this.personas = pws,
      error => console.error('Err_personSERVICE:'+error));
  }

  delete(person: IPersona) {    
    this.personasService.deletePersona(person.id)
    .subscribe(person => this.cargaData(),
      error => console.error(error));
  }

  cargaData() {
    this.personasService.getPersonas()
      .subscribe(persWS => this.personas = persWS,
        error => console.error(error));
  }
}
