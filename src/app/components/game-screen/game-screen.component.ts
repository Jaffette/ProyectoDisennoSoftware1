import { Component, OnInit } from '@angular/core';
import {UserService } from '../../services/user.service';
import { RestService } from '../../services/rest.service';
import { PassObject } from '../../services/object.service';
import { Options } from '../../interfaces/options.interface';
@Component({
  selector: 'app-game-screen',
  templateUrl: './game-screen.component.html',
  styleUrls: ['./game-screen.component.css']
})

export class GameScreenComponent implements OnInit {
  showMessages:string ="";
  token;
  message;
  public loading : boolean;
  contador:number=0;
  //Posiciones para enviar al API
  posX:number;
  posY:number;
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
  id:number = 0;
  idOp:number = 0;

  constructor(private _restService: RestService, private _object: PassObject, private _user:UserService ) {

    this.loading = false;
    this.object = _object.getObject();
    this.user = _user
    if(this._object.var1== "GG")
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
        this.id = 2;
        this.idOp = 1;
        console.log('valor del tablero en el constructor cuando soy del join',this.tablero);
        this.playerTwo = "playerTwo";
        this.methodToCallRefreshFirst();
        this.loading = true;
        
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
      this.id = 1;
      this.idOp = 2;
    }
   
   }
  ngOnInit() {
  }
  
  async methodToCallRefreshFirst(){
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

  async consultWinner(){
    console.log("Entró a consultWinner");
    var askJson = {token:this.token}
    const askWinner = await this._restService.consultOthelloWinner(askJson).then(
      data =>
      {
        console.log("Lo que llega de la consulta de winner",data);
        return data['winner'];
        
      },
      err => 
      {
        console.log("Error occured.")
      }
    );
    return askWinner;
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
    var askForWinner;
    askForWinner = await this.consultWinner();
    if(this.playerOne == "playerOne"){
      while(!this.refreshVarPlayOne){
        this.refreshVarPlayOne = await this.askRefresh();
        this.ableDisableBoard = false;
        if(askForWinner != "Any"){
          this.paintFinal()
          alert(askForWinner+" has won")
          break;
        }
      }
      
        this.ableDisableBoard = true;
        this.readMessages();
        this.loading = true;
        this.paintFinal()
        if(askForWinner != "Any"){
          this.paintFinal()
          alert(askForWinner)
        }
      
    }
  }

  async refreshForPlayerTwo(){
    var askForWinner;
    askForWinner = await this.consultWinner();
    if(this.playerTwo == "playerTwo"){
      while(this.refreshVarPlayTwo){
        this.refreshVarPlayTwo = await this.askRefresh();
        this.ableDisableBoard = false;
        if(askForWinner != "Any"){
          this.paintFinal()
          alert(askForWinner+" has won")
          break;
        }
      }
      this.readMessages();
      this.ableDisableBoard = true;
      console.log('cuando salgo en el while del P2',this.ableDisableBoard);
      this.loading = true;
      this.paintFinal()
      
        if(askForWinner != "Any"){
          this.paintFinal()
          alert(askForWinner)
        }
    }
  }
  async paint(){
    while(this.validation == "failed"){
      this.validation = await this.cambioEstado();
    }
    this.loading = true;   
    this.paintFinal(); 
  }

   paintFinal(){
    var jsonBody={token:this.token, turnoId: this.id, turnoIdOp:this.idOp};
    console.log("El objeto del paint final ",jsonBody);
      this._restService.getSessionOthello(jsonBody).then(
      data2 =>{ 
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
    console.log("El objeto para crear la sesión ",this.object)
    this._restService.createOthelloSession(this.object).subscribe(
      data =>{ 
        console.log("Lo que se va a pintar",data['graphicBoard']);
        this.tablero =  data['graphicBoard'];
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
  async positions(fila,columna,src)
   {  
     console.log(src);
        if(src == 'https://i.ibb.co/Q9qfsp3/posibilidad.png'){
          this.posX=fila;
          this.posY=columna;

         var objectMovements = 
         {
           token:this.objectToPaint.token,
           posX: this.posX,
           posY: this.posY,
           id: this.id,
           idOp: this.idOp
         }
         console.log("Obejeto Necesario ",objectMovements);
         await this._restService.playOthello(objectMovements).then
         (
           data =>
           {
             console.log("GRAPHIc PARA SARA",data['graphicBoard']);
             this.objectToPaint.token = data['token'];
             this.objectToPaint.graphicBoard = data['graphicBoard'];
             this.objectToPaint.ptsPlayerOne = data['ptsPlayerOne'];
             this.objectToPaint.ptsPlayerTwo= data['ptsPlayerTwo'];
             this.tablero = this.objectToPaint.graphicBoard;
           },
           err =>
           {
              console.log("Error while Playing");
           }
         );
        //Se setean en null;
        this.posX = null;
        this.posY = null;
        //this.loading=true;
        if(this.playerOne == "playerOne"){
          console.log("Entró al if the playerOne")
          await this.updateRefreshValue();
          //this.repaint();
          this.refreshVarPlayOne = false;
          await this.refreshForPlayerOne();

        }
        else if(this.playerTwo == "playerTwo"){
          console.log("Entró al if the playerTwo")
          await this.updateRefreshValue();
          //this.repaint();
          this.refreshVarPlayTwo = true;
          await this.refreshForPlayerTwo();
        }
      }else{
      alert("Invalid Movement");
    }
  }
     
   async repaint()
   {
     console.log('Repintando');
     this.tablero = this.objectToPaint.graphicBoard;
    console.log('Pintando la no definitiva', this.tablero);
    await setTimeout(()=>{ this.tablero = this.objectToPaint.graphicBoard; console.log('La definitiva',this.tablero)},5000);
   }
   //**********************


   async sendMessage()
      {
        var player:string;
        this.message
        console.log(this.message);
        
       if(this._object.var1== "GG")
       {
         player= "playerTwo";
       }
       else{
         player= "playerOne";
       }
       var dataToSend = {token:this.objectToPaint.token, msg:this.message, player:player }
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



