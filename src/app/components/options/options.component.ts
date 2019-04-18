import { Component, OnInit, Input, ɵConsole } from '@angular/core';
import { Options } from '../../interfaces/options.interface';
import { ActivatedRoute } from '@angular/router';
import { OptionsService } from '../../services/options.service';
import { PassObject } from '../../services/object.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
  value:string="";
  option:Options=
  {
    game:"",
    modality:"",
    level:"",
    playerOne:"",
    playerTwo:"",
    currentPlayer:"",
    ptsPlayerOne:0,
    ptsPlayerTwo:0,
    winner:'empty'
  };
  
  game:string;
  email:string;

  constructor( private activatedRoute: ActivatedRoute, private _optionService: OptionsService, private _object:PassObject) 
  {
    this.activatedRoute.params.subscribe(params => {
      this.game= params['game'];
      this.email= params['email'];
    });
      this.option.playerOne = this.email;
      this.option.game = this.game;
      this.option.currentPlayer = this.email;
      if(this.game == 'Othello/')
      {
        this.value='/gameScreen/';
      }
      else{
        this.value ='/createSession/';
      }
   }

   setObject()
   {
      this._object.setObject(this.option);
      this._object.setVar1("create");
   }
 
  ngOnInit() {
    console.log("To ",this.game, " game");
  }

  sendObject()
  {
    console.log("Enviando Objeto...");
    this._object.setObject(this.option);
  }
}
