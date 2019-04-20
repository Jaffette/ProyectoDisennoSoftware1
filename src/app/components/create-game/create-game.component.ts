import { Component, OnInit } from '@angular/core';
import { RestService } from '../../services/rest.service';
import { PassObject } from '../../services/object.service';
import { Options } from '../../interfaces/options.interface';
import { container } from '@angular/core/src/render3';
import {UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {
  showMessages:string ="";
  token;
  message;
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
    graphicBoard:[],
    graphicBoard2:[],
    currentPlayer: ""
  }
  user: UserService;
   //Backup of the Object
   object:Options;
  //recibe el tablero que proviene del API;
  public tablero;
  ableDisableBoard:boolean;
  //Variable que guarda cuando los 2 jugadores ya estan 
  validation = "failed";
  refreshVarPlayOne = false; //Variable to ask if it's time to refresh
  refreshVarPlayTwo = true;
  playerOne = "";
  playerTwo = "";
  constructor(private _restService: RestService, private _object: PassObject, private _user:UserService ) {

    this.loading = false;
    this.object = _object.getObject();
    this.user = _user
    if(this._object.var1 == "GG")
    {
        //console.log("Vengo de un join")
        this.objectToPaint.graphicBoard = [];
        this.tablero=[];
        this.objectToPaint.playerOne =  "";
        this.objectToPaint.token = "";
        this.objectToPaint.ptsPlayerOne = 0;
        this.objectToPaint.ptsPlayerTwo = 0;
        this.token = this._object.tokenParaJoin;
        this.ableDisableBoard = false;
        console.log('valor del tablero en el constructor cuando soy del join',this.ableDisableBoard);
        //this.paintFinal();
        this.playerTwo = "playerTwo";
        this.methodToCallRefreshFirst();
    }
    else{
      //console.log("Vengo de un createSession");
      this.ableDisableBoard = true;
      console.log('valor del tablero en el constructor cuando soy del create',this.ableDisableBoard);
      this.objectToPaint.graphicBoard = [];
      this.tablero=[];
      this.objectToPaint.playerOne =  "";
      this.objectToPaint.token = "";
      this.objectToPaint.ptsPlayerOne = 0;
      this.objectToPaint.ptsPlayerTwo = 0;
      this.createSession();
      this.playerOne = "playerOne";
    }
   
   }
  ngOnInit() {
  }
  async methodToCallRefreshFirst(){
    await this.paintInitially();
    await this.paintFinal();
    await this.refreshForPlayerTwo();
  }

  async cambioEstado(){
    var json = {token:this.objectToPaint.token};
    const promise = await this._restService.confirmSecondPlayer(json).then(
      data =>
      {
        return data['state'];
      },
      err => 
      {
        
        return null
      }
    );
    return promise;
  }

  async askRefresh(){
    var askJson = {token:this.token}
    const askPromise = await this._restService.getRefreshValue(askJson).then(
      data =>
      {
        console.log("Lo que llega de la consulta",data);
        return data['value'];
        
      },
      err => 
      {
        console.log("Error occured.")
      }
    );
    return askPromise;
  }

  async updateRefreshValue(){
    var refreshJson = {token:this.objectToPaint.token};
    await this._restService.updateRefreshValue(refreshJson).then(
      data =>
      {

      },
      err => 
      {
        console.log("Error occured.")
      }
    );
  }
  async refreshForPlayerOne(){
    console.log("refresh player one");
    console.log("refreshVarPlayTwo",this.refreshVarPlayOne);
    if(this.playerOne == "playerOne"){
      while(!this.refreshVarPlayOne){
        this.refreshVarPlayOne = await this.askRefresh();
        this.ableDisableBoard = false;
        console.log('cuando estoy en el while del P1',this.ableDisableBoard);
        console.log("refresh screen to player one",this.refreshVarPlayOne);
      }
      this.ableDisableBoard = true;
      this.readMessages();
      console.log('cuando salgo en el while del P!',this.ableDisableBoard);
      console.log("I will refresh the player two")
      console.log("refreshVarPlayTwo",this.refreshVarPlayOne);
      console.log("Salió del while");
      this.loading = true;
      this.paintFinal()
    }
  }
  async refreshForPlayerTwo(){
    if(this.playerTwo == "playerTwo"){
      console.log("Refresh var player two")
      while(this.refreshVarPlayTwo){
        this.refreshVarPlayTwo = await this.askRefresh();
        this.ableDisableBoard = false;
        console.log('cuando estoy en el while del P2',this.ableDisableBoard);
        console.log("refresh screen to player two",this.refreshVarPlayTwo);
      }
      this.readMessages();
      this.ableDisableBoard = true;
      console.log('cuando salgo en el while del P2',this.ableDisableBoard);
      this.loading = true;
       this.paintFinal()
    }
  }
  
  async paint(){
    while(this.validation == "failed"){
      this.validation = await this.cambioEstado();
    }
    this.loading = true;   
     await this.paintInitially()
     await this.paintFinal(); 
  }

  async paintInitially(){
    this.tablero=[];
    var jsonBody={token:this.token};
    this._restService.paintBoard(jsonBody).then(
    data2 =>{ 
    this.objectToPaint.graphicBoard2 = data2['graphicBoardReal'];
  },
  err => {
    console.log("Error occured.");
  });

  this.tablero = this.objectToPaint.graphicBoard2;
  await setTimeout(()=>{console.log('');},5000);
  }

   paintFinal(){
    var jsonBody={token:this.token};
      this._restService.paintBoard(jsonBody).then(
      data2 =>{ 
      //console.log('Entré aquí 2')
      //console.log('Info del Paint: ',data2);
      this.objectToPaint.graphicBoard = data2['graphicBoard'];
      this.tablero=this.objectToPaint.graphicBoard;
      this.objectToPaint.playerOne =  data2['playerOne'];
      this.objectToPaint.playerTwo =  data2['playerTwo'];
      this.objectToPaint.token = data2['token'];
      this.objectToPaint.ptsPlayerOne = data2['ptsPlayerOne'];
      this.objectToPaint.ptsPlayerTwo = data2['ptsPlayerTwo'];
    },
    err => {
      console.log("Error occured.");
    })
  }

   createSession(){
    //console.log("create Session",this.object); 
    this._restService.createSession(this.object).subscribe(
      data =>{ 
        //this.tablero=data['graphicBoardReal'];
        this.objectToPaint.graphicBoard =  data['graphicBoard'];
        this.objectToPaint.token = data['token'];
        this.token =  this.objectToPaint.token;
        this.objectToPaint.ptsPlayerOne = data['ptsPlayerOne'];
      },
      err => {
        console.log("Error occured.")
      }
    )
  };



  //Function that stores in the api the cards selected by the Players
  async positions(fila,columna)
   {
    //console.log("contador al inicio ",this.contador);
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
         var objectMovements = 
         {
           token:this.objectToPaint.token,
           posX1: this.posX1,
           posY1: this.posY1,
           posX2: this.posX2,
           posY2: this.posY2,
           //currentPlayer: this.objectToPaint.currentPlayer
           
         }
         this._restService.play(objectMovements).subscribe
         (
           data =>
           {
             this.objectToPaint.token = data['token'];
             this.objectToPaint.graphicBoard = data['graphicBoard'];//ESta es la que queda
             this.objectToPaint.graphicBoard2=data['graphicBoard2'];
             this.objectToPaint.ptsPlayerOne = data['ptsPlayerOne'];
             this.objectToPaint.ptsPlayerTwo= data['ptsPlayerTwo'];
             this.objectToPaint.currentPlayer= data['currentPlayer'];
             this.tablero = this.objectToPaint.graphicBoard;
           },
           err =>
           {
              console.log("Error while Playing");
           }
         );
        //Se setean en 0;
        this.posX1 = null;
        this.posY1 = null;
        this.posX2 = null;
        this.posY2 = null;
        this.contador = 0;
        if(this.playerOne == "playerOne"){
          await this.updateRefreshValue();
          this.repaint();
          this.refreshVarPlayOne = false;
          await this.refreshForPlayerOne();

        }
        else if(this.playerTwo == "playerTwo"){
          await this.updateRefreshValue();
          this.repaint();
          this.refreshVarPlayTwo = true;
          await this.refreshForPlayerTwo();
        }
       
       }
     }
   }

   async repaint()
   {
     console.log('Repintando');
     this.tablero = this.objectToPaint.graphicBoard2;
    console.log('Pintando la no definitiva', this.tablero);
    await setTimeout(()=>{ this.tablero = this.objectToPaint.graphicBoard;},5000);
   }

   async sendMessage()
   {
     var player:string;
     this.message
    if(this._object.var1== "GG")
    {
      player= "playerTwo";
    }
    else{
      player= "playerOne";
    }
    var dataToSend = {token:this.objectToPaint.token, msg:this.message, player:player }
    this.showMessages+= '\n'+player+': '+this.message;
    await this._restService.sendMessage(dataToSend);
   }


async readMessages()
{
  this.showMessages = "";
  var dataToSend = {token:this.objectToPaint.token};

   await this._restService.getMessage(dataToSend).subscribe(
     dataToShow =>{ 

     for(let i in dataToShow)
     {
       for(let j in dataToShow[i]){
          this.showMessages += '\n'+j +": "+ dataToShow[i][j];
       }
     }           
   },
   err =>
   {
     alert('Tu mensaje no puso ser enviado');
   }
   );

}

}
