import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import { LoginComponent } from './modules/login/login.component'

import { AuthComponent } from './modules/auth/auth.component'


// import {  AuthRoutingModule } from './modules/auth/auth-routing.module'

import { HomeComponent } from './modules/home/components/home/home.component'
import { LayoutComponent  } from './modules/layout/layout.component';
import { TechstaffComponent } from './modules/techstaff/techstaff.component'

import { UserComponent } from './modules/user/user.component'
import { OutsourcingComponent } from './modules/outsourcing/outsourcing.component'
import { DirectoryComponent } from './modules/directory/directory.component'
import { ConfigurationComponent } from './modules/configuration/configuration.component'
// *******************************************************************************
//


const routes: Routes = [

    {path : '',component :AuthComponent},

    { path: 'Home', component: LayoutComponent, children :[  {path : '' , component : HomeComponent } ] },

    { path: 'PersonalTecnico', component: LayoutComponent, children :[  {path : '' , component : TechstaffComponent } ] },

    { path: 'Usuarios', component: LayoutComponent, children :[  {path : '' , component : UserComponent } ] },

    { path: 'Contratas', component: LayoutComponent, children :[  {path : '' , component : OutsourcingComponent } ] },

    { path: 'Directorio', component: LayoutComponent, children :[  {path : '' , component : DirectoryComponent } ] },

    { path: 'Configuracion', component: LayoutComponent, children :[  {path : '' , component : ConfigurationComponent } ] },

     //{ path: '**', component: NotFoundComponent }
  
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule {}

