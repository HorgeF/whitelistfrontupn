import { Component, OnInit , ViewChild ,AfterViewInit ,OnDestroy} from '@angular/core';
import { OutsourcingI } from 'src/app/modules/outsourcing/service/interface/outsourcing.interface'
import { FormGroup ,FormControl ,  Validators } from '@angular/forms';
import { ToastrService }  from 'ngx-toastr'
import { OutsourcingService }  from 'src/app/modules/outsourcing/service/appservice/outsourcing.service';
import { ResponseOutsourcing }  from 'src/app/modules/outsourcing/service/interface/outsourcingResponse.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-outsourcing',
  templateUrl: './new-outsourcing.component.html',
  styleUrls: ['./new-outsourcing.component.css']
})
export class NewOutsourcingComponent implements OnInit {
  submitted = false;
  @ViewChild('closebutton') closebutton: any;
  OutSourcingForm = new FormGroup({
    dsRazonSocial: new FormControl('',Validators.required),
    nuDocId: new FormControl(null,Validators.required),
    direccion : new FormControl('',Validators.required)
   })

  constructor(private toast:ToastrService,
              private api:OutsourcingService,
              private router:Router) { }

  ngOnInit(): void {
  }



  Guardaroutsourcing(form:OutsourcingI) 
  {
    this.submitted = true;
    if (this.OutSourcingForm.invalid) {
      this.toast.warning('Completar datos','')
      return;
    }

    this.api.GuardarOutsourcing(form).subscribe(data => {

      let dataResponse:ResponseOutsourcing = data
                
        if(dataResponse.CodigoRespuesta == "001") 
        {             
          this.closebutton.nativeElement.click();
          this.toast.success(dataResponse.MensajeRespuesta,'')
          this.router.navigate(['/Contratas']);      
        }
        else 
        { 
          this.toast.error(dataResponse.MensajeRespuesta,'')            
        }
   })

  }

}
