import { Component, OnInit , ViewChild ,  Input , ElementRef,AfterViewInit ,OnDestroy } from '@angular/core';
import { FormGroup ,FormControl ,  Validators } from '@angular/forms';
import { StaffI , ListStaffI} from 'src/app/modules/techstaff/service/interface/staff.interface'

import { Router } from '@angular/router';

// import { HistoryStaffComponent } from 'src/app/modules/techstaff/component/history-staff/history-staff.component'

import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { Subject ,OperatorFunction , Observable} from 'rxjs';
import { ToastrService }  from 'ngx-toastr'

import { StaffService }  from 'src/app/modules/techstaff/service/appservice/staff.service';


import { ResponseStaff } from './service/interface/staffResponse.interface';
import { ParameterProvider } from 'src/app/parameters.provider';

import { DataTableDirective } from 'angular-datatables';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '@angular/common';
import * as XLSX from 'xlsx';

// import { SwalPortalTargets } from '@sweetalert2/ngx-sweetalert2';
// import Swal from 'sweetalert2/dist/sweetalert2.js'
import Swal from 'sweetalert2'
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

//  declare let $: any;
type Staff = {search:string , dni: string, nombre: string,codigo:number,idEntidad:number};

@Component({
  selector: 'app-techstaff',
  templateUrl: './techstaff.component.html',
  styleUrls: ['./techstaff.component.css'],
})


export class TechstaffComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;

  // datatableElement2!: DataTables.;

  isDtInitialized:boolean = false
  @ViewChild('datatable')
  datatable!: ElementRef;

  buscar: any;
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>();


  model!: NgbDateStruct | null;
  model2!: NgbDateStruct | null;

  ListadoStaff: any = [];
  ListadoArea: any = [];
  ListadoEstado: any = [];
  ListadoContrata: any = [];

  @Input()TypeaheadNumDoc:Staff[] = [];
  @Input() ListadoObservacion: any = [];
  @Input() ListadoVerificarStaff : any = [];
  // @Input() ListadoStaffSelected: any;
  // @Input()
  // ListadoStaffSelected!: FormGroup;

  IdTecnico : any;
  IdEntidad : any;

  filter = new FormControl('', {nonNullable: true});
  
  ActiveSearch = 0

  StaffFormList = new FormGroup({

    descripcion : new FormControl('',Validators.required),

   })

   @Input()
   ListadoStaffSelected = new FormGroup({
  //  StaffVerForm = new FormGroup({
    idContrata : new FormControl(0),
    idTecnico : new FormControl(0),
    dsCuadrilla: new FormControl(''),
    dsNombre : new FormControl(''),
    dsPaterno : new FormControl(''),
    dsMaterno : new FormControl(''),
    nuDocId : new FormControl(''),
    nuSCTR : new FormControl(''),
    nuPlaca : new FormControl(''),
    dsCargo : new FormControl(''),
    dtIngreso : new FormControl(''),
    dtFin : new FormControl(''),
    idArea : new FormControl(0),
    dsComentario : new FormControl(''),
    fgCapacita : new FormControl(true),
    dsNotaCapacita : new FormControl(''),
    dsTelefono : new FormControl(''),

    codigo :new FormControl(0),
    nombre :new FormControl('',Validators.required),
    apepaterno :new FormControl('',Validators.required),
    apematerno :new FormControl('',Validators.required),
    dni :new FormControl('',Validators.required),
    celular :new FormControl(''), 
    fechaingreso :new FormControl(),
    fechacese :new FormControl(),
    comentarios :new FormControl(''),
    idestado :new FormControl(),
    idcontrata :new FormControl(),
    razon_social :new FormControl('sd')

   })

  constructor(private parameterProvider: ParameterProvider,
              private api:StaffService,
              private router:Router,
              private toast:ToastrService
              ) 
  {
    // this.ListadoEstado = this.parameterProvider.ListadoEstado.filter(e => e.tabla === "Tecnico");
    // this.ListadoArea = this.parameterProvider.ListadoArea;
    // this.ListadoContrata = this.parameterProvider.ListadoContrata;
  }

  ngOnInit(): void {    

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy:true      
    }

    this.Buscar(this.StaffFormList.value)
    
  }


  Buscar(form:ListStaffI)
  {
    this.ActiveSearch = 1
    var idContrata = parseInt(localStorage.getItem('id_contrata') ?? '0', 10);
    

    this.api.ListadoStaffAll_SP(form.descripcion ? form.descripcion.toString() : '', idContrata ).subscribe(data => {
          
          this.ListadoStaff = data
 
          if (this.isDtInitialized) {
                this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {                                      
                  dtInstance.destroy();
                  this.dtTrigger.next(this.datatableElement);
                });

          } else {
            this.isDtInitialized = true
            this.dtTrigger.next(this.datatableElement);

          }     

          this.ListadoStaff.forEach((element: any) => this.TypeaheadNumDoc.push(element.dni));

    })

  }


  ExportTOExcel()
  {
     // console.log(this.datatable.nativeElement)
    //  console.log(this.datatableElement.dtInstance.catch(table.nativeElent))
    //  console.log(this.datatableElement.dtTrigger)

     const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.datatable.nativeElement);
     const wb: XLSX.WorkBook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    
    /* save to file */
     XLSX.writeFile(wb, 'SheetJS.xlsx');
    
  }

  CesarTecnico(_IdTecnico : number)
  {

    // Swal.fire({})
    Swal.fire({
      backdrop:true,
      title: 'Estas seguro?',
      text: "Se cesara al tecnico!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar'
    }).then((result) => {
      if (result.isConfirmed) {


        this.api.CesarStaff(_IdTecnico).subscribe(data => {

          let dataResponse:ResponseStaff = data

           if(dataResponse) 
           {
              // this.closebutton.nativeElement.click();
              this.toast.success("Se actualizo correctamente",'')
              // this.router.navigate(['/PersonalTecnico']);      
              this.Buscar(this.StaffFormList.value)


           }
           else 
           {
              this.toast.error("Ocurrio Algo",'')  

           }
          
            // if(dataResponse.CodigoRespuesta == "001") 
            // {             
            //   this.closebutton.nativeElement.click();
            //   this.toast.success(dataResponse.MensajeRespuesta,'')
            //   // this.router.navigate(['/PersonalTecnico']);      
            //   this.Buscar(this.StaffFormList.value)
            // }
            // else 
            // { 
            //   this.toast.error(dataResponse.MensajeRespuesta,'')            
            // }
       })    
      }
    })




  }

  ObtenerTecnicoId(_IdTecnico : number) 
  {   
    this.IdTecnico = _IdTecnico



  }

  ObtenerTecnicos() 
  {   

      this.TypeaheadNumDoc.length = 0
      var idContrata = parseInt(localStorage.getItem('id_contrata') ?? '0', 10);
      this.api.ListadoStaffAll_SP("",idContrata).subscribe(data => {

        this.ListadoVerificarStaff = data
        console.log(this.ListadoVerificarStaff)
        data.forEach((element: any) => this.TypeaheadNumDoc.push({search:element.dni + ' ' + element.nombre,
          dni:element.dni,
          nombre: element.nombre,
          codigo : element.codigo,
          idEntidad : 0 
        }));

      })





  }
 
  cargarRegistro(_IdTecnico : number)
  {

      let Staff = this.ListadoStaff.find((user: any) => user.codigo === _IdTecnico); 



       
      //  formatDate(Staff.fechaFin,'yyyy-MM-dd','en')
      // // var date1 = new Date(Staff.fechaIngreso)
       //var date2 = formatDate(data.FechaFin,'yyyy-MM-dd','en')

      this.ListadoStaffSelected.setValue({   
        idContrata : 0,
        idTecnico : 0,
        dsCuadrilla : '',
        dsNombre : '',
        dsPaterno : '',
        dsMaterno :'',
        nuDocId : '',
        nuSCTR : '',
        nuPlaca : "",
        dsCargo : "",
        dtIngreso : "", //Staff.fechaIngreso //NgbDate()
        dtFin : "",
        idArea : 0,
        // idEstado : new FormControl(0), 
        dsComentario : "",
        fgCapacita : true,
        dsNotaCapacita : "",
        dsTelefono : "",

        codigo : Staff.codigo,
        nombre :Staff.nombre,
        apepaterno :Staff.apepaterno,
        apematerno : Staff.apematerno,
        dni : Staff.dni,
        celular :Staff.celular, 
        fechaingreso : formatDate(Staff.fechaingreso,'yyyy-MM-dd','en'),
        fechacese : formatDate(Staff.fechacese,'yyyy-MM-dd','en'),
        comentarios : Staff.comentarios,
        idestado : Staff.idestado,
        idcontrata : Staff.idcontrata,
        razon_social : ""
    })


  }

  ObtenerHistorial(_codigo :number) 
  {
    this.IdTecnico = _codigo
    this.api.ListarObservaciones(_codigo).subscribe(data => {
          
      this.ListadoObservacion = data

    }) 
   
  }


}



