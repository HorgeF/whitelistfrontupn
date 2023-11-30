import { Injectable  } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient , HttpParams , HttpHeaders , HttpResponse} from '@angular/common/http'
import { environment } from "src/environments/environment.prod"
import {  UserI } from 'src/app/modules/user/service/interface/user.interface'
import {   ResponseUser } from 'src/app/modules/user/service/interface/userResponse.interface'
@Injectable({
    providedIn: 'root'
})


export class UserService 
{
   
    urlUser:string =   environment.UrlUser;

    constructor(private http:HttpClient,private para:HttpParams)  
    {
    }

    ListadoUser(form:UserI):Observable<ResponseUser[]> 
    {
     let direccion = this.urlUser + "user/listaruser" 
     return this.http.post<ResponseUser[]>(direccion,form)
    }

    GuardarUser(form:UserI)
    {
     let direccion = this.urlUser + "user/insertuser" 
     return this.http.post<ResponseUser>(direccion,form)
    }

    EliminarUser(_IdUsuario: number)
    {
     let direccion = this.urlUser + "user/eliminarUser/" + _IdUsuario
     return this.http.get<ResponseUser>(direccion)
    }

}