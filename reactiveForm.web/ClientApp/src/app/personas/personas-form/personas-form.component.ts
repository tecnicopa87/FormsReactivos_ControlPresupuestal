import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IPersona } from '../personas';
import { PersonasService } from '../personas.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-personas-form',
  templateUrl: './personas-form.component.html',
  styleUrls: ['./personas-form.component.css']
})
export class PersonasFormComponent implements OnInit {

  constructor(private fb: FormBuilder, private personService: PersonasService, private router: Router, private actitedRuote: ActivatedRoute) { }

  modoEdicion: boolean = false;
  formGroup: FormGroup;//conjunto de valores q van a machear
  personId: number;

  ngOnInit() {
    this.formGroup = this.fb.group({
      name: '',      
      email: '',
      fechaNacimiento: ''
    });

    this.actitedRuote.params.subscribe(params => {
      if (params["id"] == undefined) {
        return;
      }
      this.modoEdicion = true;
      this.personId = params['id'];

      this.personService.getPersona(this.personId.toString()).subscribe(person => this.cargarFormulario(person),
        error => this.router.navigate(["/personas"]));      

    });
  }

  cargarFormulario(person: IPersona) {
    var dp = new DatePipe(navigator.language);// <- como hacer pipe, cuando usamos DateTime en Backend
    var format = "yyyy-MM-dd";//    es necesario dar formato a fecha
    //alert(dp.transform(person.fechaNacimiento, "yyyy-MM-dd", "(UTC-06:00) Guadalajara,Ciudad de México,Monterrey", "es-MX"));
    this.formGroup.patchValue({
      name: person.name,
      email: person.email,
      fechaNacimiento: person.fechaNacimiento// dp.transform(person.fechaNacimiento)
    })
  }
  save() {
    let persona: IPersona = Object.assign({}, this.formGroup.value);
    //console.table(persona);
    if (this.modoEdicion) {
      persona.id = this.personId;
      this.personService.updatePersona(persona).subscribe(result => this.onSaveSuccess(),
        error => console.error('Errorupdateperson:'+error));
    } else { //Modo defaul dar alta
      this.personService.createPersona(persona)
        .subscribe(p => this.onSaveSuccess(),
          error => console.error('Errocreateperson:'+error));
    }
    
  }

  onSaveSuccess() {
    this.router.navigate(["/personas"]);
  }
}
