import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment.prod"
import { HttpClient , HttpParams , HttpHeaders , HttpResponse} from '@angular/common/http'
import {  ResponseOutsourcing } from 'src/app/modules/outsourcing/service/interface/outsourcingResponse.interface'
import {  OutsourcingI } from 'src/app/modules/outsourcing/service/interface/outsourcing.interface'


@Injectable({
    providedIn: 'root'
})

export class OutsourcingService 
{

    UrlOutsourcing:string =   environment.UrlOutsourcing;


    constructor(private http:HttpClient,private para:HttpParams)  
    {
    }

    GuardarOutsourcing(form:OutsourcingI)
    {
      let direccion = this.UrlOutsourcing + "Outsourcing/insertoutsourcing" 
      return this.http.post<ResponseOutsourcing>(direccion, form);   
    }

    ListadoOutsourcing(form:OutsourcingI):Observable<ResponseOutsourcing[]> 
    {
     let direccion = this.UrlOutsourcing + "Outsourcing/listaroutsourcing" 
     return this.http.post<ResponseOutsourcing[]>(direccion,form)
    }

    EliminarOutsourcing(_IdContrata: number)
    {
     let direccion = this.UrlOutsourcing + "Outsourcing/eliminaroutsourcing/" + _IdContrata
     return this.http.get<ResponseOutsourcing>(direccion)
    }


}