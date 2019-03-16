import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-against-machine',
  templateUrl: './against-machine.component.html',
  styleUrls: ['./against-machine.component.css']
})

export class AgainstMachineComponent implements OnInit {
  
  dashBoard:any[]=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
  name:string="";


  constructor( private activatedRoute: ActivatedRoute ) 
  {
    this.activatedRoute.params.subscribe(params => {

      this.name= params['game'];
    
  });
      
   }
 

  ngOnInit() {

  }

}
