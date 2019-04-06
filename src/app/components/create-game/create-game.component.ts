import { Component, OnInit } from '@angular/core';
import { Options } from '../../interfaces/options.interface';
import { objectPass } from '../../services/object.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  public loading : boolean;
  //
  contador:number=0;
  //Posiciones para enviar al API
  posX1:number;
  posY1:number;
  posX2:number;
  posY2:number;

  //recibe el tablero que proviene del API;
  public tablero;
  //Objeto para enviar al API
  object:Options;
  public grafica = 
  {
    gameType:"memory",
    graphicBoard1 : 
      [
      ["https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/216500/1427518228.svg",
       "https://openclipart.org/download/291098/fishtank-colour.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg"],
      ["https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg"],
      ["https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg"],
       ["https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg"]
      ],
      graphicBoard2 : 
      [
      ["https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg"],
      ["https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg"],
      ["https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg"],
       ["https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg",
       "https://openclipart.org/download/280803/slightly-styled-question-mark.svg"]
      ],
      playerOne:"uri.arte08@gmail.com",
      plyerTwo:"jaffette.solano@gmail.com",
      ptsPlayerOne:0,
      ptsPlayerTwo:0
    };
  

  constructor( private _object:objectPass) {
    this.loading = true;
    this.object=_object.getObject();
   }

  ngOnInit() {
    this.paint();
    
    console.log(this.object.game,this.object.level,this.object.modality,this.object.playerOne,this.object.playerTwo);
  }



    paint(){
     console.log('Pintando...');
    setTimeout(()=>{this.tablero=this.grafica.graphicBoard2;}, 2000);
    this.tablero =  this.grafica.graphicBoard1;
    
    console.log('despues de 2 segundos');
    
   }

   positions(fila,columna)
   {
     
     if(this.posX1 == null || this.posX2 == null || this.posY1==null || this.posY2==null)
     {
       if(this.contador==0)
       {
          this.posX1=fila;
          this.posY1=columna;
          this.contador++;
       }
       else
       {
        this.posX2=fila;
        this.posY2=columna;
        alert("Se insertaron las 4 posiciones");
        console.log("PosX1: "+this.posX1+" PosY1"+this.posY1+" PosX2: "+this.posX2+" PosY2: "+this.posY2);  
        //se pasan al API
        /*AQUÍ*/
        //Se setean en 0;
        this.posX1=0;
        this.posY1=0;
        this.posX2=0;
        this.posY2=0;
        //Disable de Pantalla;
       }
     }
      
   }

  

}
