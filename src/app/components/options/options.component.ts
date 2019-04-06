import { Component, OnInit, Input } from '@angular/core';
import { Options } from '../../interfaces/options.interface';
import { ActivatedRoute } from '@angular/router'
import { OptionsService } from '../../services/options.service';
import { objectPass } from '../../services/object.service';


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

  constructor( private activatedRoute: ActivatedRoute, private _optionService: OptionsService, private _object:objectPass ) 
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

  sendObject()
  {
    console.log("Enviando Objeto...");
    this._object.setObject(this.option);
  }
}
