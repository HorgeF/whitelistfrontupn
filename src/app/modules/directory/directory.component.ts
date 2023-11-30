import { Component, OnInit , ViewChild ,  Input ,AfterViewInit ,OnDestroy } from '@angular/core';
import { ParameterProvider } from 'src/app/parameters.provider';
import { ListDirectoryI } from 'src/app/modules/directory/service/interface/directory.interface'
import { ResponseDirectory } from 'src/app/modules/directory/service/interface/directoryResponse.interface'
import { DirectoryService } from 'src/app/modules/directory/service/appservice/directory.service'
import { DataTableDirective } from 'angular-datatables';
import { Subject ,OperatorFunction , Observable} from 'rxjs';
import { FormGroup ,FormControl ,  Validators } from '@angular/forms';

@Component({
  selector: 'app-directory',
  templateUrl: './directory.component.html',
  styleUrls: ['./directory.component.css']
})
export class DirectoryComponent implements OnInit {


  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  isDtInitialized:boolean = false


  dtTrigger: Subject<any> = new Subject<any>();
  dtOptions: DataTables.Settings = {}

  ActiveSearch = 0
  ListadoDirectory: any = [];
  ListadoEstado: any = [];
  ListadoContrata: any = [];


  DirectoryFormList = new FormGroup({
    dsNombre : new FormControl('',Validators.required),
    IdContrata : new FormControl(0,Validators.required),
    idEstado  : new FormControl(0,Validators.required),

   })

  constructor(private api:DirectoryService,private parameterProvider: ParameterProvider,) 
  { 

    this.ListadoEstado = this.parameterProvider.ListadoEstado.filter(e => e.tabla === "Directorio");;
    this.ListadoContrata = this.parameterProvider.ListadoContrata;
  }


  
  ngOnInit(): void {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      destroy:true      
    }

    this.Buscar(this.DirectoryFormList.value)
  }


  Buscar(form:ListDirectoryI)
  {
    this.ActiveSearch = 1

    this.api.ListadoDirectory(form).subscribe(data => {
          
          this.ListadoDirectory = data
          console.log(this.ListadoDirectory)

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

}
