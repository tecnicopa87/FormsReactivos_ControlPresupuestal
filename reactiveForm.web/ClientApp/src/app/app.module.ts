import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS  } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { PersonasComponent } from './personas/personas.component';
import { PersonasService } from './personas/personas.service';
import { PersonasFormComponent } from './personas/personas-form/personas-form.component';
import { EventosComponent } from './eventos/eventos.component';

// import the MultiSelectModule for the MultiSelect component
import { MultiSelectModule } from '@syncfusion/ej2-angular-dropdowns';
import { RegisterComponent } from './account/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AccountService } from './account/account.service';
import { LogInterceptorService } from './services/log-interceptor.service';
import { AuthInterceptorService } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    PersonasComponent,
    PersonasFormComponent,
    EventosComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MultiSelectModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'eventos', component: EventosComponent },
      { path: 'personas', component: PersonasComponent,canActivate: [AuthGuardService]  },
      { path: 'personas-agregar', component: PersonasFormComponent,canActivate: [AuthGuardService] },
      { path: 'personas-editar/:id', component: PersonasFormComponent,canActivate: [AuthGuardService] },
      { path: 'register-login/:i', component: RegisterComponent},
      { path: 'register-login', component: RegisterComponent}
    ])
  ],
  providers: [PersonasService,
    AuthGuardService,
    AccountService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogInterceptorService,
      multi:true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService, multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
