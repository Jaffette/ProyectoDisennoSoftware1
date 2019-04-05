import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { MemoryService } from '../../services/memory.service';


@Component({
  selector: 'app-against-machine',
  templateUrl: './against-machine.component.html',
  styleUrls: ['./against-machine.component.css']
})

export class AgainstMachineComponent implements OnInit {

  
  name:string="";
  tablero;
  memory;
  level:string="";
  constructor( private activatedRoute: ActivatedRoute, memory:MemoryService ) 
  {
    this.activatedRoute.params.subscribe(params => {

      this.name= params['game'];
      this.level = params['level']
      console.log(this.level);
  });
    this.memory = memory;
    this.f();
      
   }
  

  ngOnInit() {
    
  }

  async f(){
    console.log(this.level,this.name);
    this.tablero = await this.memory.readDashBoard(this.level,this.name); 
  }

  verPosiciones(fila:number,columna:number)
  {
      console.log(fila);
      console.log(columna);
  }
    
}
