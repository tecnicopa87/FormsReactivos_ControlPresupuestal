import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventoT } from '../eventos/eventotmp';//'../models/Evento'; <- clase real completa está en Models/Evento
import { EventosService } from './eventos.service';
import { Router } from '@angular/router';
import { Evento } from '../models/Evento';
import { isNumber } from 'util';
import { parse } from 'querystring';
import { forEach } from '@angular/router/src/utils/collection';
import { HttpClient } from '@angular/common/http';
import { ProductoFake } from '../models/productoFake';

//npm i @syncfusion/ej2-angular-dropdowns --save  <-Librería de terceros
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public zonasEvento: Object[];

  constructor(private fb: FormBuilder, private eventoService: EventosService, private router: Router,private http:HttpClient) {
     eventoService.zonasEvento().subscribe(lista => this.zonasEvento = lista);
  }

  frmG: FormGroup;
  public sportsData: ProductoFake[]=[];
  // public sportsData: ProductoFake[] = [
  //   { Id: '001', Game: 'Aspirina forte 250gr' },
  //   { Id: '002', Game: 'Broncolin 200ml' },
  //   { Id: '003', Game: 'Captopril tabletas' },
  //   { Id: '004', Game: 'Cafe aspirina' },
  //   { Id: '005', Game: 'Colggate Total 12' },
  //   { Id: '006', Game: 'Flanax 500' },
  //   { Id: '007', Game: 'Herbalae ' },
  //   { Id: '008', Game: 'Morfifen' },
  //   { Id: '009', Game: 'Unguento Vic' },
  //   { Id: '009', Game: 'Tecprosina' }

  // ];
  public repoSelected:ProductoFake[]=[];
  // maps the appropriate column to fields property
  public fields: Object = { text: 'Game', value: 'Id' };
  private _producto:ProductoFake={Id:'',Game:''};
  // set the placeholder to MultiSelect input element
  public waterMark: string = 'Productos promoción';
  // set the type of mode for how to visualized the selected items in input element.
  //public default: string = 'Default';
  public box: string = 'Box';
  public delimiter: string = 'Delimiter';
  ngOnInit() {
    this.http.get("../assets/data/fakeRepo.json").subscribe(repo=>{
      let products=JSON.stringify(repo);
       this.sportsData=JSON.parse(products);       
    })
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
    //this.recuperaRepo(evento.productospromocionar);
    this.eventoService.agregaEvento(evento).subscribe(result => {
      this.onSaveSuccess()
    }, error => console.log('ErrorcreatedEvento:' + error.error['301'][0]));
  }
  onSaveSuccess() {
    this.router.navigate(["/fetch-data"]);
  }
  recuperaRepo(arreglo:string[]){   
   //console.log(this.sportsData.values);      
   let ind=0;
   arreglo.forEach(element => {           
     //let objetos=this.sportsData[0];
     //console.log(objetos.Id);
     this.http.get("../assets/data/fakeRepo.json").subscribe(repo=>{
       let products=JSON.stringify(repo);
        this.sportsData=JSON.parse(products);
        console.log(this.sportsData.filter(x=>x.Id==element));
        let productoFake=this.sportsData.filter(x=>x.Id==element)[0];        
        this._producto.Id=productoFake.Id;
        this._producto.Game=productoFake.Game;
        this.repoSelected.push(this._producto);
        
     });
     this.sportsData=this.repoSelected;//solo muestre prods p éste IdEvento
     //objetos.filter(x=>x.Id=='002');
     //this.repoSelected.push(this.sportsData.filter(x=>(this.fields)x[0].Id==element));
   });
   console.log(this.repoSelected);
  }
}
