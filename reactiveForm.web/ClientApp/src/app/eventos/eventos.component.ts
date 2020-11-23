import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventoT } from '../eventos/eventotmp';//'../models/Evento'; <- clase real completa está en Models/Evento
import { EventosService } from './eventos.service';
import { Router } from '@angular/router';
import { Evento } from '../models/Evento';
import { isNumber } from 'util';
import { parse } from 'querystring';

//npm i @syncfusion/ej2-angular-dropdowns --save  <-Librería de terceros
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public zonasEvento: Object[];

  constructor(private fb: FormBuilder, private eventoService: EventosService, private router: Router) {
     eventoService.zonasEvento().subscribe(lista => this.zonasEvento = lista);
  }

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
      fechaInicio: '',
      fechaFin: '',
      duracion: '',
      nombreevento: '',
      noAsistentes: '',
      productospromocionar: '',
      lugarevento:''
    });
  }

  guardar() {
    let _evento: Evento = Object.assign({}, this.frmG.value);
    //let tiempo = parseInt(_evento.duracion); //Number.parseInt(        
    const evento: EventoT = { dateFormatted: _evento.fechaInicio, dateFinFormatted: _evento.fechaFin, duracion: _evento.duracion, asistentes: _evento.noAsistentes, summary: _evento.lugarevento,productospromocionar:_evento.productospromocionar }
    alert(evento.productospromocionar);
    //alert(evento.productospromocionar[1]);
    this.eventoService.agregaEvento(evento).subscribe(result => {
      this.onSaveSuccess()
    }, error => console.log('ErrorcreatedEvento:' + error.error['301'][0]));
  }
  onSaveSuccess() {
    this.router.navigate(["/fetch-data"]);
  }
}
