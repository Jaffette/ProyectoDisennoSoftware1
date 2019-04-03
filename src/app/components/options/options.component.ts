import { Component, OnInit, Input } from '@angular/core';
import { Options } from '../../interfaces/options.interface';
import { ActivatedRoute } from '@angular/router'
import { OptionsService } from '../../services/options.service';
import { Key } from 'protractor';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  option:Options=
  {
    game:"",
    modality:"",
    level:"",
    playerOne:"",
    playerTwo:"",
    turnPlayerOne:true,
    turnPlayerTwo:false,
    ptsPlayerOne:0,
    ptsPlayerTwo:0,
    winner:'empty'
  };
  
  
  game:string;
  email:string;
  key:string;

  constructor( private activatedRoute: ActivatedRoute, private _optionService: OptionsService ) 
  {
    this.activatedRoute.params.subscribe(params => {
      this.game= params['game'];
      this.email= params['email'];
    });
      this.option.playerOne = this.email;
      this.option.game = this.game;
      console.log(this.email);
   }

  ngOnInit() {
  }

  modalityLevelGameVerification(game:string, modality:string, level:string)
  {
    let direccion:string="";
    if(modality=='PlayerVsBot')
    {
      direccion= '/againstmachine/:modality/level/game'
    }
    else if (modality)
    {
      direccion= '/createGame/:modality/level'
    }
    console.log(direccion);
    return direccion;
  }



//Function to store the type of game in the dataset
  optionsSelected()
  {
    this.key=this._optionService.writeUserData(this.option);
    console.log('La llave es: ',this.key)
   }

  

}
