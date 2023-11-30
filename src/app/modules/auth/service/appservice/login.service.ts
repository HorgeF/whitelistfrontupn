import { Injectable } from '@angular/core';
import { HttpClient , HttpParams , HttpHeaders , HttpResponse} from '@angular/common/http'
import {  LoginI } from 'src/app/modules/auth/service/interface/login.interface'
import { environment } from "src/environments/environment.prod"
import {  ResponseLogin } from 'src/app/modules/auth/service/interface/loginResponse.interface'

@Injectable({
    providedIn: 'root'
})

export class LoginService 
{

    //urlLogin:string =  environment.UrlLogin;
    urlGenerico:string =  environment.UrlGenerico;

    constructor(private http:HttpClient,private para:HttpParams)  
    {
    }

    login(form:LoginI)
    {
      //let direccion = this.urlLogin + "Login/auth" 
      let direccion = this.urlGenerico + "login"
      return this.http.post<ResponseLogin>(direccion, form);   

    }

}