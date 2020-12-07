import { Component, OnInit, ɵConsole } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EventoT } from '../eventos/eventotmp';//'../models/Evento'; <- clase real completa está en Models/Evento
import { EventosService } from './eventos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Evento } from '../models/Evento';
import { HttpClient } from '@angular/common/http';
import { ProductoFake } from '../models/productoFake';

//import { isNumber } from 'util';
//import { parse } from 'querystring';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';


//npm i @syncfusion/ej2-angular-dropdowns --save  <-Librería de terceros
@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html',
  styleUrls: ['./eventos.component.css']
})
export class EventosComponent implements OnInit {

  public zonasEvento: Object[];
  private modoVer: boolean;

  public actRoute:ActivatedRoute;
  constructor(private fb: FormBuilder, private eventoService: EventosService, private router: Router, public activeRoute: ActivatedRoute,private http:HttpClient) {
    
    this.http.get("../assets/data/fakeRepo.json").subscribe(repo=>{
      let products=JSON.stringify(repo);
       this.sportsData=JSON.parse(products);       
    });
    eventoService.zonasEvento().subscribe(lista => this.zonasEvento = lista);
    
  }
  result:boolean;
  frmG: FormGroup;
  public sportsData: ProductoFake[]=[];
  
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
       
    // this.http.get("../assets/data/fakeRepo.json").subscribe(repo=>{
    //   let products=JSON.stringify(repo);
    //    this.sportsData=JSON.parse(products);       
    // })
    this.frmG = this.fb.group({
      fechaInicio: '',
      fechaFin: '',
      duracion: '',
      nombreevento: '',
      noAsistentes: '',
      productospromocionar: '',
      lugarevento: ''
    });
  
    console.log('1.-Origen sportData');
    console.log(this.sportsData);
    this.activeRoute.params.subscribe(param => {
      if (param['id'] == null) {
        return;
      } else {
        //llamr a servicio obtenerEvento
        this.modoVer = true;
        console.log('1)getEvento encontró id');
        this.eventoService.getEvento(param['id']).subscribe(event =>          
          this.cargaData(event,event.productospromocionar)
        );
      }

    });
  
    
  }

  guardar() {
    let _evento: Evento = Object.assign({}, this.frmG.value);
    //let tiempo = parseInt(_evento.duracion); //Number.parseInt(        
    const evento: EventoT = { idEvento: 0, nombreevento: _evento.nombreevento, dateFormatted: _evento.fechaInicio, dateFinFormatted: _evento.fechaFin, duracion: _evento.duracion, asistentes: _evento.noAsistentes, summary: _evento.lugarevento ,productospromocionar:_evento.productospromocionar }
    //alert(evento.productospromocionar);    

    this.eventoService.agregaEvento(evento).subscribe(result => {
      this.onSaveSuccess()
    }, error => console.log('ErrorcreatedEvento:' + error.error['301'][0]));
  }
  onSaveSuccess() {
    this.router.navigate(["/fetch-data"]);
  }

   cargaData(mievento: EventoT,clavesprod:string[]){
     let url="../assets/data/fakeRepo.json";          
    
    var repoSelected=this.repoSelected;// this.repoSelected es una variable global
    var sportsData=this.sportsData;// pero para accederla desde función la asigno en otra var
    console.log('2)apenas se llenó sportsData local');
    var dataRecover=this.sportsData;//<- solucion provisionl al filtrado iterativo
    function mockHTTPRequest(url) {
      return Observable.of(`Response from ${url}`)
        //.delay(300);
    }
     var _producto = this._producto;
//     this.sportsData = repoSelected;
     function recuperaRepo(arreglo: string[]): ProductoFake[]{   
      console.log('4)'+sportsData[0]);
      var ind=0;
      arreglo.forEach(element => {                           
        //alert('index:'+ind);
        try {
          let productoFake=sportsData.filter(x=>x.Id==element)[ind];        
          _producto.Id=productoFake.Id;
          //alert('elem[ind].nombre'+_producto.Game);
          _producto.Game=productoFake.Game;        
          repoSelected.push(_producto);
          ind=ind+1; 
          //sportsData=dataRecover; 
        } catch (error)        
        {
          //alert('imprimo error:'+error.message);
          console.log('5)sportsData en consola previo al alert.Error');
        }       
        
     });
     //console.log(repoSelected);
       return repoSelected;//true;
     }
    function cargaFormulario(mievent: EventoT) {
      // var dp = new DatePipe(navigator.language);// <- como hacer pipe, cuando usamos DateTime en Backend
      // var format = "yyyy-MM-dd";//
      // var timezone = "(UTC-06:00) Guadalajara,Ciudad de México,Monterrey";                                   
      //alert('debió ejecutar recupaRepo'+repoSelected[0]);
      let products=JSON.stringify(repoSelected);
      
      sportsData=JSON.parse(products);
      // this.frmG.patchValue({
      //   fechaInicio: dp.transform(mievent.dateFormatted, format, timezone, "es-MX"),
      //   fechaFin: dp.transform(mievent.dateFinFormatted, format, timezone, "es-MX"),
      //   duracion: mievent.duracion,
      //   nombreevento: mievent.nombreevento,
      //   noAsistentes: mievent.asistentes,      
      //   productospromocionar: sportsData,//this.repoSelected,
      //   lugarevento: mievent.summary
      // })
    }
      Observable.of(url)
      .concatMap(_url=>{
        console.log('3)ejecutando Observable recupeRepo');
        recuperaRepo(clavesprod);
        //this.sportsData = repoSelected;
        console.log("5)podría asignar repoSelected");
        return mockHTTPRequest(_url);
      })
      .do(response=> {console.log(response);
       cargaFormulario(mievento)})
       .subscribe(response => {
         //alert('pasó cargaFormulario, enseguida llenará campos:'+mievento.summary);
         this.sportsData = repoSelected;//sportsData;
         console.log("6)asignó " + repoSelected[0]);
        var dp = new DatePipe(navigator.language);// <- como hacer pipe, cuando usamos DateTime en Backend
      var format = "yyyy-MM-dd";//
      var timezone = "(UTC-06:00) Guadalajara,Ciudad de México,Monterrey";  
        this.frmG.patchValue({
          fechaInicio: dp.transform(mievento.dateFormatted, format, timezone, "es-MX"),
          fechaFin: dp.transform(mievento.dateFinFormatted, format, timezone, "es-MX"),
          duracion: mievento.duracion,
          nombreevento: mievento.nombreevento,
          noAsistentes: mievento.asistentes,
          productospromocionar: this.repoSelected,//sportsData
          lugarevento: mievento.summary
        })
       }
        );

   }
  // function recuperaRepo(arreglo:string[]):boolean{   
  //  //console.log(this.sportsData.values);      
  //  var ind=0;
  //  arreglo.forEach(element => {           
  //    //let objetos=this.sportsData[0];
  //    //console.log(objetos.Id);
  //    this.http.get("../assets/data/fakeRepo.json").subscribe(repo=>{
  //      let products=JSON.stringify(repo);
  //       this.sportsData=JSON.parse(products);
  //       alert('index:'+ind);
  //       console.log(this.sportsData.filter(x=>x.Id==element)[ind]);
        
  //       let productoFake=this.sportsData.filter(x=>x.Id==element)[ind];        
  //       this._producto.Id=productoFake.Id;
  //       alert('elem[ind]'+this._producto);
  //       this._producto.Game=productoFake.Game;        
  //       this.repoSelected.push(this._producto);
  //       ind=ind+1;
  //    });
  //    this.sportsData=this.repoSelected;//solo muestre prods p éste IdEvento
  //    //objetos.filter(x=>x.Id=='002');
  //    //this.repoSelected.push(this.sportsData.filter(x=>(this.fields)x[0].Id==element));
  //  });
  //  return true;
  // }

//    cargaFormulario(mievent: EventoT) {
//     var dp = new DatePipe(navigator.language);// <- como hacer pipe, cuando usamos DateTime en Backend
//     var format = "yyyy-MM-dd";//
//     var timezone = "(UTC-06:00) Guadalajara,Ciudad de México,Monterrey";
//     //console.log(dp.transform(mievent.dateFormatted, "short"));
//     //var fechafinal = dp.transform(mievent.dateFinFormatted, "yyyy-MM-dd","(UTC-06:00) Guadalajara,Ciudad de México,Monterrey","es-MX");
//     //alert(dp.transform(mievent.dateFormatted, "yyyy-MM-dd", "(UTC-06:00) Guadalajara,Ciudad de México,Monterrey", "es-MX"));
//     console.log(mievent.productospromocionar);
    
//     //var funcion=this.recuperaRepo(mievent.productospromocionar);
    
//     console.log(this.repoSelected);
//     alert('debió ejecutar recupaRepo'+this.repoSelected);
//     let products=JSON.stringify(this.repoSelected)[0];
//     alert(products);
//     this.sportsData=JSON.parse(products);
//     this.frmG.patchValue({
//       fechaInicio: dp.transform(mievent.dateFormatted, format, timezone, "es-MX"),
//       fechaFin: dp.transform(mievent.dateFinFormatted, format, timezone, "es-MX"),
//       duracion: mievent.duracion,
//       nombreevento: mievent.nombreevento,
//       noAsistentes: mievent.asistentes,      
//       productospromocionar: this.sportsData,//this.repoSelected,
//       lugarevento: mievent.summary
//     })
//   }
}
