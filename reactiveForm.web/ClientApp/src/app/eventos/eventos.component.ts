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
    { Id: '001', Game: 'Aspirina forte 250gr' },
    { Id: '002', Game: 'Broncolin 200ml' },
    { Id: '003', Game: 'Captopril tabletas' },
    { Id: '004', Game: 'Cafe aspirina' },
    { Id: '005', Game: 'Colggate Total 12' },
    { Id: '006', Game: 'Flanax 500' },
    { Id: '007', Game: 'Herbalae ' },
    { Id: '008', Game: 'Morfifen' },
    { Id: '009', Game: 'Unguento Vic' },
    { Id: '009', Game: 'Tecprosina' }

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
