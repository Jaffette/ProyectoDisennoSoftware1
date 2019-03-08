import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-against-machine',
  templateUrl: './against-machine.component.html',
  styleUrls: ['./against-machine.component.css']
})
export class AgainstMachineComponent implements OnInit {

  nombre:string="memoria";
  dashBoard:any[]=[];

  constructor( private activatedRoute: ActivatedRoute ) 
  {

  }

  ngOnInit() {
  }

}
