import { Component, OnInit ,ViewChild, Input } from '@angular/core';
import { TechstaffComponent  }  from 'src/app/modules/techstaff/techstaff.component';
import { FormGroup ,FormControl ,  Validators } from '@angular/forms';
import { ObsI, StaffI } from 'src/app/modules/techstaff/service/interface/staff.interface'
import { StaffService }  from 'src/app/modules/techstaff/service/appservice/staff.service';
import { ResponseObservacion} from 'src/app/modules/techstaff/service/interface/observacionResponse.interface'
import { ToastrService }  from 'ngx-toastr'
import { empty } from 'rxjs';

@Component({
  selector: 'app-history-staff',
  templateUrl: './history-staff.component.html',
  styleUrls: ['./history-staff.component.css']
})
export class HistoryStaffComponent implements OnInit {

  // ListadoObservacion: any = [];

  @Input() ListadoObservacion: any = [];
  @ViewChild('closebutton') closebutton: any;
  submitted = false;
  currentDate: Date = new Date();
  
  ObsForm = new FormGroup({
    id_obs : new FormControl(0), //this.Tech.IdEntidad,
    codigo : new FormControl(0),
    observacion: new FormControl('',Validators.required),
   })


  constructor(private Tech:TechstaffComponent,
             private api:StaffService,
             private toast:ToastrService,) 
  {
      
    

  }

  

  ngOnInit(): void {


    
  }


  ObservarStaff(form:ObsI) 
  {
    form.id_obs = 0
    form.codigo = this.Tech.IdTecnico 
    this.submitted = true;
    if (this.ObsForm.invalid) {
      // this.toast.warning('Completar datos','')
      return;
    }

        this.api.ObservarStaff(form).subscribe(data => {

          let dataResponse:ResponseObservacion = data
                    
            if(dataResponse)
            {                           
              this.closebutton.nativeElement.click();
              this.ObsForm.reset();
              this.toast.success("Se Guardo correctamente.",'')
              // this.Tech.ObtenerHistorial(this.Tech.IdEntidad)
              this.Tech.Buscar(this.Tech.StaffFormList.value)  
            }
            else 
            { 
              this.toast.error("Ocurrio Algo",'')            
            }
      })


  }




}
