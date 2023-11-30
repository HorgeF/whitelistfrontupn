import { Component ,OnInit  } from '@angular/core';
import { ParameterProvider } from 'src/app/parameters.provider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit  {
  title = 'Winet.RPT';
  ListadoEstado: any = [];

  constructor() 
  {
   
   
  }

  ngOnInit(): void {
    
  }


}


