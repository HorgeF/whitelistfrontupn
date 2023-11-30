import { Component, OnInit , ViewChild ,  Input ,AfterViewInit ,OnDestroy } from '@angular/core';
import { ParameterProvider } from 'src/app/parameters.provider';
import { FormGroup ,FormControl ,  Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subject ,OperatorFunction , Observable} from 'rxjs';
import { ListUserI } from 'src/app/modules/user/service/interface/user.interface'
import { UserService }  from 'src/app/modules/user/service/appservice/user.service';
import { ResponseUser } from 'src/app/modules/user/service/interface/userResponse.interface'
import { ToastrService }  from 'ngx-toastr'

import Swal from 'sweetalert2'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {


  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  isDtInitialized:boolean = false


  ActiveSearch = 0
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {}
  ListadoUser: any = [];
  ListadoEstado : any = [];
  ListadoEmpresa : any = [];

  UserFormList = new FormGroup({
    dsNombre : new FormControl('',Validators.required),
    idEmpresa : new FormControl(0,Validators.required),
    idEstado  : new FormControl(0,Validators.required),

   })

   @Input()
   UserSelectedForm = new FormGroup({
    idEmpresa : new FormControl('',Validators.required),
    idRolUsuario : new FormControl('',Validators.required),
    nuDocId : new FormControl('',Validators.required),
    dsNombre : new FormControl('',Validators.required),
    dsPaterno : new FormControl('',Validators.required),
    dsMaterno : new FormControl('',Validators.required),
    dsCorreo : new FormControl('',Validators.required),
    cdUsuario : new FormControl('',Validators.required)

   })

  constructor(private api:UserService,
              private parameterProvider: ParameterProvider,
              private toast:ToastrService) 
  {
    this.ListadoEstado = this.parameterProvider.ListadoEstado.filter(e => e.tabla === "Usuario");
    this.ListadoEmpresa = this.parameterProvider.ListadoEmpresa;
  }

  ngOnInit(): void {


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy:true      
    }

    this.Buscar(this.UserFormList.value)
  }



  Buscar(form:ListUserI)
  {
    this.ActiveSearch = 1

    this.api.ListadoUser(form).subscribe(data => {
          
          this.ListadoUser = data
          if (this.isDtInitialized) {
                this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {                                      
                  dtInstance.destroy();
                  this.dtTrigger.next(this.datatableElement);
                });

          } else {
            this.isDtInitialized = true
            this.dtTrigger.next(this.datatableElement);

          }              
    })

  }

  EliminarUsuario(_IdUsuario : number)
  {

    // Swal.fire({})
    Swal.fire({
      backdrop:true,
      title: 'Estas seguro?',
      text: "Se eliminara Usuario!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {


        this.api.EliminarUser(_IdUsuario).subscribe(data => {

          let dataResponse:ResponseUser = data
                    
            if(dataResponse.CodigoRespuesta == "001") 
            {             
              this.toast.success(dataResponse.MensajeRespuesta,'')
              // this.router.navigate(['/PersonalTecnico']);      
              this.Buscar(this.UserFormList.value)
            }
            else 
            { 
              this.toast.error(dataResponse.MensajeRespuesta,'')            
            }
       })    
      }
    })

  }


  cargarRegistro(_IdUsuario : number)
  {
  
    let user = this.ListadoUser.find((user: any) => user.idUsuario === _IdUsuario); 
    //  console.log(user)

      //  var _dtIngreso = formatDate(Staff.fechaIngreso,'yyyy-MM-dd','en')
      //  var _dtFin = formatDate(Staff.fechaFin,'yyyy-MM-dd','en')
      //var date1 = new Date(Staff.fechaIngreso)
      // var date2 = formatDate(data.FechaFin,'yyyy-MM-dd','en')

      this.UserSelectedForm.setValue({   
        idEmpresa : user.idEmpresa,
        idRolUsuario : user.idRolUsuario,
        nuDocId : user.nuDocId,
        dsNombre : user.dsNombre,
        dsPaterno : user.dsPaterno,
        dsMaterno : user.dsMaterno,
        dsCorreo : user.dsCorreo,
        cdUsuario : user.cdUsuario
    })

  }


}
