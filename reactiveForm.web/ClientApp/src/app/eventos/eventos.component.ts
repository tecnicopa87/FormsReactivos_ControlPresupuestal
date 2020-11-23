import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventoT } from '../eventos/eventotmp';//'../models/Evento'; <- clase real completa está en Models/Evento
import { EventosService } from './eventos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Evento } from '../models/Evento';
//import { isNumber } from 'util';
//import { parse } from 'querystring';
import { DatePipe } from '@angular/common';

//npm i @syncfusion/ej2-angular-dropdowns --save  <-Librería de terceros
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public zonasEvento: Object[];
  private modoVer: boolean;

  constructor(private fb: FormBuilder, private eventoService: EventosService, private router: Router, private activeRoute: ActivatedRoute) {
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
      lugarevento: ''
    });

    this.activeRoute.params.subscribe(param => {
      if (param['id'] == null) {
        return;
      } else {
        //llamr a servicio obtenerEvento
        this.modoVer = true;
        console.log('encontró id');
        this.eventoService.getEvento(param['id']).subscribe(event =>
          this.cargaFormulario(event)
        );
      }

    });
  }

  guardar() {
    let _evento: Evento = Object.assign({}, this.frmG.value);
    //let tiempo = parseInt(_evento.duracion); //Number.parseInt(        
    const evento: EventoT = { idEvento: 0, nombreevento: _evento.nombreevento, dateFormatted: _evento.fechaInicio, dateFinFormatted: _evento.fechaFin, duracion: _evento.duracion, asistentes: _evento.noAsistentes, summary: _evento.lugarevento }
    alert(evento.summary);
    //alert(evento.productospromocionar[1]);
    this.eventoService.agregaEvento(evento).subscribe(result => {
      this.onSaveSuccess()
    }, error => console.log('ErrorcreatedEvento:' + error[0]));
  }
  onSaveSuccess() {
    this.router.navigate(["/fetch-data"]);
  }

  cargaFormulario(mievent: EventoT) {
    var dp = new DatePipe(navigator.language);// <- como hacer pipe, cuando usamos DateTime en Backend
    var format = "yyyy-MM-dd";//
    var timezone = "(UTC-06:00) Guadalajara,Ciudad de México,Monterrey";
    //console.log(dp.transform(mievent.dateFormatted, "short"));
    //var fechafinal = dp.transform(mievent.dateFinFormatted, "yyyy-MM-dd","(UTC-06:00) Guadalajara,Ciudad de México,Monterrey","es-MX");
    //alert(dp.transform(mievent.dateFormatted, "yyyy-MM-dd", "(UTC-06:00) Guadalajara,Ciudad de México,Monterrey", "es-MX"));
    this.frmG.patchValue({
      fechaInicio: dp.transform(mievent.dateFormatted, format, timezone, "es-MX"),
      fechaFin: dp.transform(mievent.dateFinFormatted, format, timezone, "es-MX"),
      duracion: mievent.duracion,
      nombreevento: mievent.nombreevento,
      noAsistentes: mievent.asistentes,
      productospromocionar: ["falta p1", "Colggate Total 12"],
      lugarevento: mievent.summary
    })

  }
}
