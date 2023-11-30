import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment.prod"

@Injectable({
    providedIn: 'root'
})
export class ParameterProvider {
   
    ListadoEstado: any[] = []; 
    ListadoArea: any[] = []; 
    ListadoContrata: any = [];
    ListadoRolUsuario: any = [];
    ListadoEmpresa: any = [];

    UrlStaffUtil = environment.UrlStaffUtil; 
    UrlOutsourcing = environment.UrlOutsourcing; 
    UrlUser = environment.UrlUser; 


    constructor(private http:HttpClient) 
    {

    }
     
      GetEstados() {

         return "";
      //   let direccionEstado = this.UrlStaffUtil + "StaffUtil/listarEstado" 

      //   return new Promise<void>((resolve,reject) => {
      //       this.http.get(direccionEstado).subscribe((resp:any) => {
      //        this.ListadoEstado = resp;
      //        resolve();
      //       })
 
      //    })

      }

      GetArea() 
      {

            return "";
         // let direccionArea = this.UrlStaffUtil + "StaffUtil/listarArea" 

         // return new Promise<void>((resolve,reject) => {
         //    this.http.get(direccionArea).subscribe((resp:any) => {
         //     this.ListadoArea = resp;
         //     resolve();
         //    })
 
         // })

      }

      GetContrata() 
      {

         return "";
         // let direccionContrata = this.UrlOutsourcing + "Outsourcing/alloutsourcing" 

         // return new Promise<void>((resolve,reject) => {
         //    this.http.get(direccionContrata).subscribe((resp:any) => {
         //     this.ListadoContrata = resp;
         //     resolve();
         //    })
 
         // })

      }

      GetUsuarioRoles() 
      {

         return "";
         // let direccionUser = this.UrlUser + "UserUtil/listarRol" 

         // return new Promise<void>((resolve,reject) => {
         //    this.http.get(direccionUser).subscribe((resp:any) => {
         //     this.ListadoRolUsuario = resp;
         //     resolve();
         //    })
 
         // })

      }


      GetEmpresa() 
      {

         return "";
         // let direccionUser = this.UrlUser + "UserUtil/listarEmpresa" 

         // return new Promise<void>((resolve,reject) => {
         //    this.http.get(direccionUser).subscribe((resp:any) => {
         //     this.ListadoEmpresa = resp;
         //     resolve();
         //    })
 
         // })

      }

  
  }