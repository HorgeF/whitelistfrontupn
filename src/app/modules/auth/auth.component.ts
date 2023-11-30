import { Component, OnInit } from '@angular/core';


import {  LoginI } from 'src/app/modules/auth/service/interface/login.interface'
import {  ResponseLogin } from 'src/app/modules/auth/service/interface/loginResponse.interface'
import {  LoginService }  from 'src/app/modules/auth/service/appservice/login.service';
import { ToastrService }  from 'ngx-toastr'
import { FormGroup ,FormControl ,  Validators } from '@angular/forms';


import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm = new FormGroup({
    usuario : new FormControl('',Validators.required),
    password  : new FormControl('',Validators.required)
   })

  constructor(private api:LoginService,private router:Router,private toast:ToastrService) { }

  ngOnInit(): void {
  }

  OnLogin(form:LoginI) 
  {
    
   console.log(form);
  //  this.router.navigate(['/PersonalTecnico']);

    this.api.login(form).subscribe(data => {

      let dataResponse:ResponseLogin = data
        
        
        if(dataResponse.token != null) 
        {
         

          // localStorage.setItem('usuario', dataResponse.Usuario);
          // localStorage.setItem('idusuario', dataResponse.IdUsuario.toString());

           localStorage.setItem('id_contrata', dataResponse.id_contrata.toString());
           localStorage.setItem('razonsocial', dataResponse.razonsocial);
          // localStorage.setItem('nombre', dataResponse.Nombre);
          // localStorage.setItem('apaterno', dataResponse.aPaterno);
          // localStorage.setItem('amaterno', dataResponse.aMaterno);
          // localStorage.setItem('idTpPersona', dataResponse.idTpPersona.toString());

          this.router.navigate(['/PersonalTecnico']); 

      
        }
        else 
        { 

          this.toast.info("Usuario y/o Contraseña Incorrecta !")
        
        }

   })


    
  }

}
