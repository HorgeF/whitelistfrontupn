import { Component, OnInit ,ViewChild, Input } from '@angular/core';
import { ParameterProvider } from 'src/app/parameters.provider';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {


  @Input() UserSelectedForm: any;
  ListadoRolUsuario: any = [];
  ListadoEmpresa: any = [];

  constructor(private parameterProvider: ParameterProvider,) 
  {
    this.ListadoRolUsuario = this.parameterProvider.ListadoRolUsuario;
    this.ListadoEmpresa = this.parameterProvider.ListadoEmpresa

  }

  ngOnInit(): void {
  }

}
