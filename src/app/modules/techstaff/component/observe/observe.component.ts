import { Component, OnInit , ViewChild ,AfterViewInit ,OnDestroy} from '@angular/core';
import { FormGroup ,FormControl ,  Validators } from '@angular/forms';
import { ObsI, StaffI } from 'src/app/modules/techstaff/service/interface/staff.interface'
import { ToastrService }  from 'ngx-toastr'
import { StaffService }  from 'src/app/modules/techstaff/service/appservice/staff.service';
import { TechstaffComponent  }  from 'src/app/modules/techstaff/techstaff.component';
import { ResponseObservacion} from 'src/app/modules/techstaff/service/interface/observacionResponse.interface'
import { ResponseStaff } from '../../service/interface/staffResponse.interface';

@Component({
  selector: 'app-observe',
  templateUrl: './observe.component.html',
  styleUrls: ['./observe.component.css']
})
export class ObserveComponent implements OnInit {

  @ViewChild('closebutton') closebutton: any;
  submitted = false;

  ObsForm = new FormGroup({
      id_obs : new FormControl(0), //this.Tech.IdEntidad,
      codigo : new FormControl(0),
      observacion: new FormControl('',Validators.required),
   })


  constructor(private toast:ToastrService,
              private api:StaffService,
              private Tech:TechstaffComponent) { }



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

    // this.api.ObservarEstadoStaff(this.Tech.IdTecnico);
        this.api.ObservarStaff(form).subscribe(data => {

          let dataResponse:ResponseObservacion = data
                    
            if(dataResponse) 
            {                 
              
                    this.api.ObservarEstadoStaff(this.Tech.IdTecnico).subscribe(data => {

                      let dataResponse2:ResponseStaff = data
                                
                        if(dataResponse2) 
                        {                                      
                          this.closebutton.nativeElement.click();
                          this.toast.success("Se guardo la observación",'')
                          this.Tech.Buscar(this.Tech.StaffFormList.value)  
                        }
                        else 
                        { 
                          this.toast.error("Ocurrio Algo.",'')            
                        }
                  })
            }
            else 
            { 
              this.toast.error("Ocurrio Algo.",'')            
            }
      })


  }

}
