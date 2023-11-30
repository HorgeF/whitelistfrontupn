import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css',]
})
export class LayoutComponent implements OnInit {

  user?:null|string
 

  constructor()
   {


  }

  ngOnInit(): void {
    
    // this.user = localStorage.getItem('usuario');
    this.user = localStorage.getItem('razonsocial');
   
  }

}
