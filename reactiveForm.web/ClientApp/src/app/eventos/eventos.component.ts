import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Evento } from '../models/Evento';
//npm i @syncfusion/ej2-angular-dropdowns --save  <-Librería de terceros
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  frmG: FormGroup;
  public sportsData: Object[] = [
    { Id: 'Game1', Game: 'American Football' },
    { Id: 'Game2', Game: 'Badminton' },
    { Id: 'Game3', Game: 'Basketball' },
    { Id: 'Game4', Game: 'Cricket' },
    { Id: 'Game5', Game: 'Football' },
    { Id: 'Game6', Game: 'Golf' },
    { Id: 'Game7', Game: 'Hockey' },
    { Id: 'Game8', Game: 'Rugby' },
    { Id: 'Game9', Game: 'Snooker' },
    { Id: 'Game10', Game: 'Tennis' }
  ];
  // maps the appropriate column to fields property
  public fields: Object = { text: 'Game', value: 'Id' };
  // set the placeholder to MultiSelect input element
  public waterMark: string = 'Productos promoción';
  // set the type of mode for how to visualized the selected items in input element.
  //public default: string = 'Default';
  public box: string = 'Box';
  public delimiter: string = 'Delimiter';
  ngOnInit() {
    this.frmG = this.fb.group({
      fechainicio: '',
      fechafin: '',
      duracion: '',
      nombreevento: '',
      noAsistentes: '',
      productospromocionar: ''
    });
  }

  guardar() {
    let evento: Evento = Object.assign({}, this.frmG.value);
    alert(evento.productospromocionar[1]);
  }
}
