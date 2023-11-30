import { Component, OnInit , ViewChild ,  Input ,AfterViewInit ,OnDestroy } from '@angular/core';
import { ParameterProvider } from 'src/app/parameters.provider';
import { FormGroup ,FormControl ,  Validators } from '@angular/forms';
import { OutsourcingService  }  from 'src/app/modules/outsourcing/service/appservice/outsourcing.service';
import { OutsourcingI } from 'src/app/modules/outsourcing/service/interface/outsourcing.interface'
import { ResponseOutsourcing} from 'src/app/modules/outsourcing/service/interface/outsourcingResponse.interface'
import { DataTableDirective } from 'angular-datatables';
import { Subject ,OperatorFunction , Observable} from 'rxjs';
import { ToastrService }  from 'ngx-toastr'

import Swal from 'sweetalert2'
@Component({
  selector: 'app-outsourcing',
  templateUrl: './outsourcing.component.html',
  styleUrls: ['./outsourcing.component.css']
})
export class OutsourcingComponent implements OnInit {

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  isDtInitialized:boolean = false
  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {}


  ListadoOutsourcing : any = [];
  ListadoEstado : any = [];

  OutsourcingFormList = new FormGroup({
    // idContrata: new FormControl('',Validators.required),
    contrata: new FormControl('',Validators.required),
    idEstado : new FormControl(null,Validators.required)

   })

   @Input()
    OutsourcingSelectedForm = new FormGroup({
      nuDocId: new FormControl('',Validators.required),
      dsRazonSocial: new FormControl(null,Validators.required),
      direccion : new FormControl('',Validators.required)
   })

  constructor(private api:OutsourcingService,private parameterProvider:ParameterProvider,private toast:ToastrService) 
  {
    this.ListadoEstado = this.parameterProvider.ListadoEstado.filter(e => e.tabla === "Contrata");;
  }

  ngOnInit(): void {

    this.Buscar(this.OutsourcingFormList.value)

  }

  Buscar(form:OutsourcingI)
  {
    //this.ActiveSearch = 1

    this.api.ListadoOutsourcing(form).subscribe(data => {
          
          this.ListadoOutsourcing = data

          if (this.isDtInitialized) {
                this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {                                      
                  dtInstance.destroy();
                  this.dtTrigger.next(this.datatableElement);
                });

          } else {
            this.isDtInitialized = true
            this.dtTrigger.next(this.datatableElement);

          }     

          // this.ListadoStaff.forEach((element: any) => this.TypeaheadNumDoc.push(element.nuDoc));

    })

  }

  EliminarOutsourcing(_IdContrata : number)
  {

    // Swal.fire({})
    Swal.fire({
      backdrop:true,
      title: 'Estas seguro?',
      text: "Se eliminara contrata!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {


        this.api.EliminarOutsourcing(_IdContrata).subscribe(data => {

          let dataResponse:ResponseOutsourcing = data
                    
            if(dataResponse.CodigoRespuesta == "001") 
            {             
              this.toast.success(dataResponse.MensajeRespuesta,'')
              // this.router.navigate(['/PersonalTecnico']);      
              this.Buscar(this.OutsourcingFormList.value)
            }
            else 
            { 
              this.toast.error(dataResponse.MensajeRespuesta,'')            
            }
       })    
      }
    })

  }

  cargarRegistro(_IdContrata : number)
  {
  
     let outsourcing = this.ListadoOutsourcing.find((out: any) => out.idContrata === _IdContrata); 

      //  var _dtIngreso = formatDate(Staff.fechaIngreso,'yyyy-MM-dd','en')
      //  var _dtFin = formatDate(Staff.fechaFin,'yyyy-MM-dd','en')
      //var date1 = new Date(Staff.fechaIngreso)
      // var date2 = formatDate(data.FechaFin,'yyyy-MM-dd','en')

      this.OutsourcingSelectedForm.setValue({   
        nuDocId : outsourcing.nuDocId,
        dsRazonSocial : outsourcing.contrata,
        direccion : outsourcing.direccion,
    })


  }




}
