import { Injectable } from '@angular/core';
//import { Observable } from 'rxjs/Observable';

@Injectable()
export class ErroresServiceService {

  private pagecount: number;
  constructor() { }
   public logvisitas() {
     this.pagecount = Number.parseInt(localStorage.getItem("visitas"));
     if (this.pagecount > 0) {       
       this.pagecount += 1;
       //alert(this.pagecount);
       localStorage.setItem("visitas", this.pagecount.toString());
       
     } else {       
       this.pagecount = 1;       
       localStorage.setItem("visitas", this.pagecount.toString());
    }
    
    //return this.pagecount;
   
  }
}
