import { Component } from '@angular/core';
import { ErroresServiceService } from '../serivice/errores-service.service';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0;

  public constructor(private logService: ErroresServiceService) {
    logService.logvisitas();
    this.currentCount = Number.parseInt(localStorage.getItem("visitas"));
  }

  public incrementCounter() {
    this.currentCount = Number.parseInt(localStorage.getItem("visitas"));
  }
}
