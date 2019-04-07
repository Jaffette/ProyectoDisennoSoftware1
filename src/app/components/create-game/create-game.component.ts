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


  token;
  public loading : boolean;
  //La matriz Grafica
  //Contador para verificar 
  contador:number=0;
  //Posiciones para enviar al API
  posX1:number;
  posY1:number;
  posX2:number;
  posY2:number;
 //Objeto para trabajar
  public objectGame = {
  currentPlayer:"",
  graphicBoard:[],
  graphicBoardReal:[],
  key:"",
  ptsPlayerOne:0,
  winner:""};
  //ObjectComplete
  objectComplete;

  objectToPaint = {
    token:"",
    playerOne:"",
    playerTwo:"",
    ptsPlayerOne:0,
    ptsPlayerTwo:0,
    graphicBoard:[]
  }

   //Backup of the Object
   object:Options;
  //recibe el tablero que proviene del API;
  public tablero;
 /*
  //Graphicboards
  graphicBoard1;
  graphicBoard2;*/
  //Variable que guarda cuando los 2 jugadores ya estan 
  validation = "failed";

  constructor(private _restService: RestService, private _object: PassObject ) {

    this.loading = false;
    this.object = _object.getObject();

    if(this._object.var1== "GG")
    {
        console.log("Vengo de un join")
        this.token = this._object.tokenParaJoin;
        this.paintFinal();
        this.loading = true;
        
    }
    else{
      console.log("Vengo de un createSession");
      console.log('Valores del objeto',this.object);
      this.createSession();
    }
   
   }

  ngOnInit() {
    
  }

  async cambioEstado(){
    console.log('Cambio de Estado')
    var json = {token:this.objectGame.key};
    
    const promise = await this._restService.confirmSecondPlayer(json).then(
      data =>
      {
        console.log("Lo que llega de la consulta",data);
        return data['state'];
      },
      err => 
      {
        console.log("Error occured.")
        return null
      }
    );
    console.log(promise);
    return promise;
  }


  async paint(){
    while(this.validation == "failed"){
      this.validation = await this.cambioEstado();
    }
    this.loading = true;   
    this.paintFinal(); 
         
  }

   paintFinal(){
    var json={token:this.token};
    console.log('Valor de mi token para pintar: ',this.token)
     this._restService.paintBoard(json).subscribe(
      data =>{ 
        console.log('Info del Paint: ',data);
      this.objectToPaint.graphicBoard = data['graphicBoard'];
      this.tablero=this.objectToPaint.graphicBoard;
      this.objectToPaint.playerOne =  data['playerOne'];
      this.objectToPaint.playerTwo =  data['playerTwo'];
      this.objectToPaint.token = data['token'];
      this.objectToPaint.ptsPlayerOne = data['ptsPlayerOne'];
      this.objectToPaint.ptsPlayerTwo = data['ptsPlayerTwo'];
    },
    err => {
      console.log("Error occured.")
    }
  )
   }


   createSession(){
    this._restService.createSession(this.object).subscribe(
      data =>{ 
        //this.tablero=data['graphicBoardReal'];
        this.objectGame.currentPlayer = data['currentPlayer'];
        this.objectGame.graphicBoardReal =  data['graphicBoardReal'];
        this.objectGame.graphicBoard =  data['graphicBoard'];
        this.objectGame.key = data['key'];
        this.token =  this.objectGame.key;
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
             this.objectToPaint.token = data['token'];
             this.objectToPaint.graphicBoard = data['graphicBoard']; // esto no queda así devolver ambas matrices 
             this.objectToPaint.ptsPlayerOne = data['ptsPlayerOne'];
             this.objectToPaint.ptsPlayerTwo= data['ptsPlayerTwo'];
             this.tablero = this.objectToPaint.graphicBoard;
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
        this.contador = 0;
        //Disable de Pantalla;
       }
     }
      
   }

  

}
