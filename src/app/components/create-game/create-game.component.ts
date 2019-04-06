import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { PassObject } from '../../services/object.service';
import { Options } from '../../interfaces/options.interface';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  public loading : boolean;
  //La matriz Grafica
  //Contador para verificar 
  contador:number=0;
  //Posiciones para enviar al API
  posX1:number;
  posY1:number;
  posX2:number;
  posY2:number;
  //Var for the while
  whileVar=true;
  //Objeto para trabajar
  public objectGame = {
  currentPlayer:"",
  graphicBoard:[],
  graphicBoardReal:[],
  key:"",
  ptsPlayerOne:0,
  winner:""};
  //recibe el tablero que proviene del API;
  public tablero;
  //Backup of the Object
  object:Options;
  //Graphicboards
  graphicBoard1;
  graphicBoard2;
  //Variable que guarda cuando los 2 jugadores ya estan 
  validation;
  constructor(private _restService: RestService, private _object: PassObject ) {
    this.loading = false;
    this.object = _object.getObject();
    this.createSession();
   }

  ngOnInit() {
    
  }


   cambioEstado(){
     console.log("En cambio estado");
    var json = {token:this.objectGame.key}
     this._restService.confirmSecondPlayer(json).subscribe(
      data =>
      {
          console.log("Lo que llega de la consulta",data);
          this.validation = data;   
      },
      err => 
      {
        console.log("Error occured.")
      }
    );
  }

      paint(){

         this.cambioEstado();
        if(typeof this.validation != "undefined")
        {
          this.loading = true;
        }
        else{
          setTimeout(()=>{this.cambioEstado();}, 450);
        }
      
   }
 
   
    createSession(){
    this._restService.createSession(this.object).subscribe(
      data =>{ 
        this.tablero=data['graphicBoardReal'];
        this.objectGame.currentPlayer = data['currentPlayer'];
        this.objectGame.graphicBoardReal =  data['graphicBoardReal'];
        this.objectGame.graphicBoard =  data['graphicBoard'];
        this.objectGame.key = data['key'];
        this.objectGame.ptsPlayerOne = data['ptsPlayerOne'];
        this.objectGame.winner = data['winner'];
      },
      err => {
        console.log("Error occured.")
      }
    )
  };

  //Function that stores in the api the cards selected by the Players
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
         var objectMovements = 
         {
           token:this.objectGame.key,
           posX1: this.posX1,
           posY1: this.posY1,
           posX2: this.posX2,
           posY2: this.posY2,
           currentPlayer: this.objectGame.currentPlayer
         }
         this._restService.play(objectMovements).subscribe
         (
           data =>
           {
             this.objectGame.key = data['token'];
             this.objectGame.graphicBoardReal = data['graphicBoard']; // esto no queda así devolver ambas matrices 
             this.objectGame.ptsPlayerOne = data['ptsPlayerOne'];
             this.objectGame.currentPlayer = data['currentPlayer'];
            console.log( this.objectGame.currentPlayer)
           },
           err =>
           {
              console.log("Error while Playing");
           }
         );
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
