import { Component, OnInit , ViewChild ,AfterViewInit ,OnDestroy} from '@angular/core';
import { FormGroup ,FormControl ,  Validators } from '@angular/forms';
import { ParameterProvider } from 'src/app/parameters.provider';
import { UserI } from 'src/app/modules/user/service/interface/user.interface'
import { ToastrService }  from 'ngx-toastr'
import { UserService } from 'src/app/modules/user/service/appservice/user.service'
import { ResponseUser } from 'src/app/modules/user/service/interface/userResponse.interface'
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent implements OnInit {

  submitted = false;
  ListadoRolUsuario: any = [];
  ListadoEmpresa: any = [];
  @ViewChild('closebutton') closebutton: any;

  UserForm = new FormGroup({

    idEmpresa : new FormControl(1,Validators.required),
    idRolUsuario : new FormControl(1,Validators.required),
    nuDocId : new FormControl('',Validators.required),
    dsNombre : new FormControl('',Validators.required),
    dsPaterno : new FormControl('',Validators.required),
    dsMaterno : new FormControl('',Validators.required),
    dsCorreo : new FormControl('',Validators.required),
    cdUsuario : new FormControl('',Validators.required),
    cdPassword : new FormControl('',Validators.required)
   })


  constructor(private parameterProvider: ParameterProvider,
             private toast:ToastrService,
             private api:UserService,
             private router:Router) 
    { 
      this.ListadoRolUsuario = this.parameterProvider.ListadoRolUsuario;
      this.ListadoEmpresa = this.parameterProvider.ListadoEmpresa
    }

  ngOnInit(): void {

  }



  GuardarUser(form:UserI) 
  {
   
    this.submitted = true;
    if (this.UserForm.invalid) {
      this.toast.warning('Completar datos','')
      return;
    }

      this.api.GuardarUser(form).subscribe(data => {

        let dataResponse:ResponseUser = data
                  
          if(dataResponse.CodigoRespuesta == "001") 
          {             
            this.closebutton.nativeElement.click();
            this.toast.success(dataResponse.MensajeRespuesta,'')
            this.router.navigate(['/Usuario']);      
          }
          else 
          { 
            this.toast.error(dataResponse.MensajeRespuesta,'')            
          }
    })

  }





}
