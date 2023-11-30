
import { NgModule , APP_INITIALIZER} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule  , ValidationErrors } from '@angular/forms';
// import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
// import { AuthRoutingModule } from './modules/auth/auth-routing.module';
import { HomeRoutingModule } from './modules/home/home-routing.module';
//Root
import { AppRoutingModule } from './app-routing.module';
import { NgbModule ,NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

import { TechstaffComponent } from './modules/techstaff/techstaff.component'
import { ConfigurationComponent } from './modules/configuration/configuration.component';
import { DirectoryComponent } from './modules/directory/directory.component';
import { LayoutComponent } from './modules/layout/layout.component';
import { UserComponent } from './modules/user/user.component';
// import { LoginComponent } from './modules/login/login.component';

import { HttpClientModule , HttpParams , HttpHeaders} from '@angular/common/http';
import { AuthComponent } from './modules/auth/auth.component';

import { DataTablesModule } from 'angular-datatables';
import { ToastrModule }  from 'ngx-toastr'
import { NgSelectModule } from '@ng-select/ng-select';

import { ParameterProvider } from './parameters.provider';
import { NewStaffComponent } from './modules/techstaff/component/new-staff/new-staff.component';
import { CheckstaffComponent } from './modules/techstaff/component/checkstaff/checkstaff.component';
import { HistoryStaffComponent } from './modules/techstaff/component/history-staff/history-staff.component';
import { OutsourcingComponent } from './modules/outsourcing/outsourcing.component';
import { NewOutsourcingComponent } from './modules/outsourcing/component/new-outsourcing/new-outsourcing.component';
import { ObserveComponent } from './modules/techstaff/component/observe/observe.component';
import { NewDirectoryComponent } from './modules/directory/component/new-directory/new-directory.component';
import { NewUserComponent } from './modules/user/component/new-user/new-user.component';
import { ViewStaffComponent } from './modules/techstaff/component/view-staff/view-staff.component';
import { ViewUserComponent } from './modules/user/component/view-user/view-user.component';
import { ViewOutsourcingComponent } from './modules/outsourcing/component/view-outsourcing/view-outsourcing.component';
import { ViewDirectoryComponent } from './modules/directory/component/view-directory/view-directory.component'



export function parameterProviderEstado(provider: ParameterProvider) {
  return () => provider.GetEstados();
}

export function parameterProviderArea(provider: ParameterProvider) {
  return () => provider.GetArea();
}

export function parameterProviderContrata(provider: ParameterProvider) {
  return () => provider.GetContrata();
}

export function parameterProviderUsuarioRol(provider: ParameterProvider) {
  return () => provider.GetUsuarioRoles();
}
export function parameterProviderEmpresa(provider: ParameterProvider) {
  return () => provider.GetEmpresa();
}

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    OutsourcingComponent,
    // LoginComponent,
    ConfigurationComponent,
    UserComponent,
    DirectoryComponent,
    TechstaffComponent,
    AuthComponent,
    NewStaffComponent,
    CheckstaffComponent,
    HistoryStaffComponent,
    OutsourcingComponent,
    NewOutsourcingComponent,
    ObserveComponent,
    NewDirectoryComponent,
    NewUserComponent,
    ViewStaffComponent,
    ViewUserComponent,
    ViewOutsourcingComponent,
    ViewDirectoryComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // AuthRoutingModule,
    // HomeRoutingModule, 
    ReactiveFormsModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    DataTablesModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    NgSelectModule,
    
    
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,   
    
  ],
  providers: [HttpParams,
    {
      provide: APP_INITIALIZER,
      useFactory: parameterProviderEstado,
      deps: [ParameterProvider],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: parameterProviderArea,
      deps: [ParameterProvider],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: parameterProviderContrata,
      deps: [ParameterProvider],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: parameterProviderUsuarioRol,
      deps: [ParameterProvider],
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: parameterProviderEmpresa,
      deps: [ParameterProvider],
      multi: true
    },
    
],
  bootstrap: [AppComponent]
})
export class AppModule { }
