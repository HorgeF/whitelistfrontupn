import { Component, OnInit , Input} from '@angular/core';
import { FormGroup ,FormControl ,  Validators } from '@angular/forms';
import { StaffI , ListStaffI} from 'src/app/modules/techstaff/service/interface/staff.interface'
import { StaffService }  from 'src/app/modules/techstaff/service/appservice/staff.service';
import { Subject ,OperatorFunction , Observable,filter} from 'rxjs';
import { debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { TechstaffComponent } from 'src/app/modules/techstaff/techstaff.component'
import { ToastrService }  from 'ngx-toastr'



type Staff = {search:string , dni: string, nombre: string,codigo:number,idEntidad:number};

@Component({
  selector: 'app-checkstaff',
  templateUrl: './checkstaff.component.html',
  styleUrls: ['./checkstaff.component.css']
})
export class CheckstaffComponent implements OnInit {


  ListadoObservacion: any = [];

  ActiveSearch = 0
  @Input()TypeaheadNumDoc:Staff[] = [];
  // ListadoStaff: any = [];
  StaffSelected : any

  formatter = (state: Staff) => state.search;

  seleccionado!: Staff;

  StaffSeach = new FormGroup({
    dsNombre : new FormControl('',Validators.required),
   })

  constructor
  (
    private api:StaffService,
    private toast:ToastrService,
    private tech:TechstaffComponent
  ) 
  { 


  }

  ngOnInit(): void {




  }
  
  VerificarTecnico(staff : any,type : number)
  {
   
    try 
    {  

        var IdTecnico = staff?.item?.codigo? staff.item.codigo : staff.codigo ?  staff.codigo : 0
        var IdEntidad = staff?.item?.idEntidad? staff.item.idEntidad : staff.idEntidad ?  staff.idEntidad : 0
        this.StaffSelected = this.tech.ListadoVerificarStaff.find((user: any)  => user.codigo === IdTecnico);  //this.ListadoStaff.find((user: any)  => user.idTecnico === IdTecnico);
        this.ActiveSearch = this.StaffSelected.codigo > 0 ? 1 : 0;

        this.ObtenerHistorial(IdTecnico);
       
    }
    catch(error) {
       this.ActiveSearch = 0
      //  this.toast.info("No se encontraron técnicos")
        //this.toast.success("zs",'')
    }
  }

  ObtenerHistorial(_IdEntidad :number) 
  {

    this.api.ListarObservaciones(_IdEntidad).subscribe(data => {
          
      this.ListadoObservacion = data
      console.log(this.ListadoObservacion)

    }) 
   

  }

  // Buscar(form:ListStaffI)
  // {

  //   this.api.ListadoStaff(form).subscribe(data => {
         

  //         this.ListadoStaff =data
  //         data.forEach((element: any) => this.TypeaheadNumDoc.push({search:element.nuDoc + ' ' + element.nombreStaff,
  //                                                                   nuDoc:element.nuDoc,
  //                                                                   nombreStaff: element.nombreStaff,
  //                                                                   idTecnico : element.idTecnico,
  //                                                                   idEntidad : element.idEntidad }));

  //   })



  // }


  CerrarModalCheck()
  {
    this.ActiveSearch = 0;
    this.StaffSeach.reset();
    
  }
  // search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
  // text$.pipe(
  //   debounceTime(200),
  //   distinctUntilChanged(),
  //   map(term => term.length < 2 ? []
  //     : this.TypeaheadNumDoc.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  // );

  search: OperatorFunction<string, readonly {search:any ,dni: any, nombre: any }[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.TypeaheadNumDoc.filter(state => new RegExp(term, 'mi').test(state.search)).slice(0, 10))
  );

  
}
