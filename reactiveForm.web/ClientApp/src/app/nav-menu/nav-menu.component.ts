import { Component } from '@angular/core';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  nombreusuario: string;

  constructor(private acountServ: AccountService) {
    this.nombreusuario = localStorage.getItem("user");
    console.log(this.nombreusuario);
    if (localStorage.getItem("user") == undefined) {
      this.nombreusuario = "";
    }
    
  }
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
}
