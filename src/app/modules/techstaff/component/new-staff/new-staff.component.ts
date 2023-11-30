import { Component, OnInit , ViewChild ,AfterViewInit ,OnDestroy} from '@angular/core';
import { FormGroup ,FormControl ,  Validators } from '@angular/forms';
import { StaffI , ListStaffI} from 'src/app/modules/techstaff/service/interface/staff.interface'
import { ParameterProvider } from 'src/app/parameters.provider';
import { StaffService }  from 'src/app/modules/techstaff/service/appservice/staff.service';
import { Router } from '@angular/router';
import { ToastrService }  from 'ngx-toastr'
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { ResponseStaff } from 'src/app/modules/techstaff/service/interface/staffResponse.interface';
import { Subject ,OperatorFunction , Observable} from 'rxjs';
import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

import {TechstaffComponent} from 'src/app/modules/techstaff/techstaff.component'
import { formatDate } from '@angular/common';
import { data } from 'jquery';

@Component({
  selector: 'app-new-staff',
  templateUrl: './new-staff.component.html',
  styleUrls: ['./new-staff.component.css'],
  providers: [
    {provide: NgbDateAdapter, useClass: NewStaffComponent},
  ]
})
export class NewStaffComponent implements OnInit {

  readonly DELIMITER = '-';

  submitted = false;
  @ViewChild('closebutton') closebutton: any;
  ListadoArea: any = [];
  ListadoContrata: any = [];
  TypeaheadNumDoc = [''];


  // model!: NgbDateStruct | null;
  // model2!: NgbDateStruct | null;

  nrSelect = 0
  nrSelect2 = 0

  placement = 'bottom';

  StaffForm = new FormGroup({
    idContrata : new FormControl(0),
    idTecnico : new FormControl(0),
    dsCuadrilla: new FormControl(''),
    dsNombre : new FormControl(''),
    dsPaterno : new FormControl(''),
    dsMaterno : new FormControl(''),
    //TpDoc : new FormControl('',Validators.required),
    // nuDocId : new FormControl('',[Validators.required,Validators.nullValidator]),
    nuDocId : new FormControl(''),
    nuSCTR : new FormControl(''),
    nuPlaca : new FormControl(''),
    dsCargo : new FormControl(''),
    dtIngreso : new FormControl(''),
    dtFin : new FormControl(''),
    idArea : new FormControl(0),
    // idEstado : new FormControl(0), 
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
    fechaingreso :new FormControl(new Date),
    fechacese :new FormControl(new Date),
    comentarios :new FormControl(''),
    idestado :new FormControl(1),
    idcontrata :new FormControl(parseInt(localStorage.getItem('id_contrata') ?? '0', 10)),
    razon_social :new FormControl('')

    //Rol : new FormControl('1',Validators.required),
   })

  constructor(private parameterProvider: ParameterProvider,
              private api:StaffService,
              private router:Router,
              private toast:ToastrService,
              private parserFormatter: NgbDateParserFormatter,
              private  Techstaff:TechstaffComponent
              ) 
              {;
                
                // this.ListadoArea = this.parameterProvider.ListadoArea;
                // this.ListadoContrata = this.parameterProvider.ListadoContrata;
                // this.nrSelect = this.ListadoArea[0].idArea?  this.ListadoArea[0].idArea :  0              
                // this.nrSelect2 =  this.ListadoContrata[0]?.idContrata?  this.ListadoContrata[0].idContrata :  0

               }

  ngOnInit(): void {

  }




  GuardarStaff(form:StaffI) 
  {


    // form.fechacese = formatDate(form.fechacese?.toString(),"YYYY-MM-DD","PE")

    console.log(form);
    this.submitted = true;
    if (this.StaffForm.invalid) {
      this.toast.warning('Completar datos','')
      return;
    }

  
    this.api.GuardarStaff(form).subscribe(data => {

        let dataResponse:ResponseStaff = data

        if(dataResponse)
        {
          this.closebutton.nativeElement.click();
          this.toast.success('Guardado Correctamente','')
          this.router.navigate(['/PersonalTecnico']);
          this.StaffForm.reset();
          this.Techstaff.ngOnInit();                
        } 
        else 
        { 
          this.toast.error("Ocurrio Algo",'')            
        }     
        // if(dataResponse.CodigoRespuesta == "001") 
        // {             
        //   this.closebutton.nativeElement.click();
        //   this.toast.success(dataResponse.MensajeRespuesta,'')
        //   this.router.navigate(['/PersonalTecnico']);      
        // }
        // else 
        // { 
        //   this.toast.error(dataResponse.MensajeRespuesta,'')            
        // }
   })

  }


  customSearchFn(term: string, item: { name: string; }) {
    item.name = item.name.replace(',','');
    term = term.toLocaleLowerCase();
    return item.name.toLocaleLowerCase().indexOf(term) > -1;
  }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 2 ? []
      : this.TypeaheadNumDoc.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  );


  // fromModel(value: string | null): NgbDateStruct | null {
  //   if (value) {
  //     const date = value.split(this.DELIMITER);
  //     console.log(value)
  //     return {
  //       day : parseInt(date[0], 10),
  //       month : parseInt(date[1], 10),
  //       year : parseInt(date[2], 10)
  //     };
  //   }
  //   return null;
  // }

  // toModel(date: NgbDateStruct | null): string | null {
  //   return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  // }

}
