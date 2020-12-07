import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  nombreusuario: string;

  constructor(private acountServ: AccountService, private route: Router) {
    this.estatuslogin();
    //console.log(this.nombreusuario);
    //if (localStorage.getItem("user") == undefined) {
    //  this.nombreusuario = "";
    //}
    
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  estatuslogin() {
    this.nombreusuario = this.acountServ.estaLogueado();
    return this.nombreusuario;
  }
  salirse() {
    let confirmar = confirm('Está seguro de cerrar sessión?');
    if (confirmar) {
      //console.log('confirmó salida');
      this.acountServ.logout();// el service elimina la sesion del localStorage      
    }
    
  }

}
