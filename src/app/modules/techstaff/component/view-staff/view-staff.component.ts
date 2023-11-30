import { Component, OnInit ,ViewChild, Input } from '@angular/core';
import { FormGroup ,FormControl ,  Validators } from '@angular/forms';
import { ParameterProvider } from 'src/app/parameters.provider';
import { StaffI } from '../../service/interface/staff.interface';
import { StaffService } from '../../service/appservice/staff.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TechstaffComponent } from '../../techstaff.component';
import { ResponseStaff } from '../../service/interface/staffResponse.interface';

@Component({
  selector: 'app-view-staff',
  templateUrl: './view-staff.component.html',
  styleUrls: ['./view-staff.component.css']
})
export class ViewStaffComponent implements OnInit {


  // @Input() ListadoStaffSelected: any;
  submitted = false;
  ListadoArea: any = [];
  ListadoContrata: any = [];
  @ViewChild('closebutton') closebutton: any;

  @Input()
  ListadoStaffSelected = new FormGroup({
    idContrata : new FormControl(0),
    idTecnico : new FormControl(0),
    dsCuadrilla: new FormControl(),
    dsNombre : new FormControl(),
    dsPaterno : new FormControl(),
    dsMaterno : new FormControl(),
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

    codigo :new FormControl(1),
    nombre :new FormControl('',Validators.required),
    apepaterno :new FormControl('',Validators.required),
    apematerno :new FormControl('',Validators.required),
    dni :new FormControl('',Validators.required),
    celular :new FormControl(''), 
    fechaingreso :new FormControl(new Date),
    fechacese :new FormControl(new Date),
    comentarios :new FormControl(''),
    idestado :new FormControl(1),
    idcontrata :new FormControl(1),
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
  {
    // this.ListadoArea = this.parameterProvider.ListadoArea;
    // this.ListadoContrata = this.parameterProvider.ListadoContrata;
   
  }

  ngOnInit(): void {
   
      // console.log(this.ListadoStaffSelected)
    
  }

  EditarStaff(form:StaffI) 
  {


    this.submitted = true;


    for (const controlName in this.ListadoStaffSelected.controls) {
      const control = this.ListadoStaffSelected.get(controlName);
    
      if (control?.invalid) {
        console.log(`FormControl ${controlName} is invalid`);
      }
    }

    if (this.ListadoStaffSelected.invalid) {
      this.toast.warning('Completar datos','')
      return;
    }

  
    this.api.EditarStaff(form).subscribe(data => {

        let dataResponse:ResponseStaff = data

        if(dataResponse)
        {
          this.closebutton.nativeElement.click();
          this.toast.success('Guardado Correctamente','')
          this.router.navigate(['/PersonalTecnico']);
          this.ListadoStaffSelected.reset();
          this.Techstaff.ngOnInit();                
        } 
        else 
        { 
          this.toast.error("Ocurrio Algo",'')            
        }     
   })

  }



}
