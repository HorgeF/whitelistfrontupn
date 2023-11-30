import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpParams , HttpHeaders , HttpResponse} from '@angular/common/http'
import {  StaffI } from 'src/app/modules/techstaff/service/interface/staff.interface'
import { environment } from "src/environments/environment.prod"

import {  ResponseStaff } from 'src/app/modules/techstaff/service/interface/staffResponse.interface'

import {  ResponseObservacion } from 'src/app/modules/techstaff/service/interface/observacionResponse.interface'


@Injectable({
    providedIn: 'root'
})

export class StaffService 
{
   
    urlStaff:string =   environment.UrlStaffUtil;
    urlGenerico:string =   environment.UrlGenerico;

    constructor(private http:HttpClient,private para:HttpParams)  
    {
    }

    GuardarStaff(form:StaffI)
    {
      //let direccion = this.urlStaff + "Staff/insertstaff" 
      let direccion = this.urlGenerico + "techstaff" 
      return this.http.post<ResponseStaff>(direccion, form);   
    }

    EditarStaff(form:StaffI)
    {
      //let direccion = this.urlStaff + "Staff/insertstaff" 
      let direccion = this.urlGenerico + "techstaff" 
      return this.http.put<ResponseStaff>(direccion, form);   
    }

    CesarStaff(idTecnico: number)
    {
    //  let direccion = this.urlStaff + "Staff/cesarStaff/" + idTecnico
     let direccion = this.urlGenerico + "techstaff_estado/" + idTecnico
     return this.http.get<ResponseStaff>(direccion)
    }

    ObservarEstadoStaff(idTecnico: number)
    {
    //  let direccion = this.urlStaff + "Staff/cesarStaff/" + idTecnico
     let direccion = this.urlGenerico + "techstaff_observar/" + idTecnico
     return this.http.get<ResponseStaff>(direccion)
    }

    ListadoStaff(form:StaffI):Observable<ResponseStaff[]> 
    {
     //let direccion = this.urlGenerico + "Staff/listarstaff"
     let direccion = this.urlGenerico + "techstaff" 
     return this.http.post<ResponseStaff[]>(direccion,form)
    }

    
    ListadoStaffAll(): Observable<ResponseStaff[]> {
      let direccion = this.urlGenerico + 'techstaff';
      return this.http.get<ResponseStaff[]>(direccion, {});
    }

    ListadoStaffAll_SP(descripcion: string, idContrata: number): Observable<ResponseStaff[]> {
      const params = { descripcion, id_contrata: idContrata.toString() };
      let direccion = this.urlGenerico + 'techstaff_sp';
      return this.http.get<ResponseStaff[]>(direccion, {params});
    }

    // ListadoCuadrilla(idCuadrilla: number):Observable<ResponseCuadrilla[]> 
    // {
    //  let direccion = this.urlStaff + "Staff/listarCuadrilla/" + idCuadrilla
    //  return this.http.get<ResponseCuadrilla[]>(direccion)
    // }
   
    ObservarStaff(form:StaffI)
    {
      //let direccion = this.urlStaff + "StaffUtil/insertstaffobs" 
      let direccion = this.urlGenerico + "obs" 
      return this.http.post<ResponseObservacion>(direccion, form);   
    }

    ListarObservaciones(codigo: number):Observable<ResponseObservacion[]> 
    {
     //let direccion = this.urlStaff + "StaffUtil/listarEntObs/" + idEntidad
     let direccion = this.urlGenerico + "obsall/" + codigo
     return this.http.get<ResponseObservacion[]>(direccion)
    }

}