import { Component, OnInit ,ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-view-outsourcing',
  templateUrl: './view-outsourcing.component.html',
  styleUrls: ['./view-outsourcing.component.css']
})
export class ViewOutsourcingComponent implements OnInit {

  @Input() OutsourcingSelectedForm: any;
  constructor() { }

  ngOnInit(): void {
  }

}
