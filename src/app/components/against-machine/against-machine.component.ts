import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-against-machine',
  templateUrl: './against-machine.component.html',
  styleUrls: ['./against-machine.component.css']
})
export class AgainstMachineComponent implements OnInit {

  name:string="";
  
  dashBoard:any[];

  constructor( private activatedRoute: ActivatedRoute ) 
  {
    this.activatedRoute.params.subscribe(params => {
      this.name= params['game'];
    if(params['level']=='LevelOne')
    {
      this.dashBoard=[[0,0,0,0],
                      [0,0,0,0],
                      [0,0,0,0]]
    }
    else if (params['level']=='LevelTwo')
    {
      this.dashBoard=[[0,0,0,0,0,0],
                      [0,0,0,0,0,0],
                      [0,0,0,0,0,0],
                      [0,0,0,0,0,0],
                      [0,0,0,0,0,0]]
    }
    else{
      this.dashBoard=[[0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0],
                      [0,0,0,0,0,0,0,0]]
    }
  });
      
   }
 

  ngOnInit() {
    
  }

}
