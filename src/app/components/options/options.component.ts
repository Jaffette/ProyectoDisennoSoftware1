import { Component, OnInit, Input } from '@angular/core';
import { Options } from '../../interfaces/options.interface';
import { ActivatedRoute } from '@angular/router'
import { OptionsService } from '../../services/options.service';


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
    key:"",
    winner:'empty'
  };
  
  
  game:string;
  email:string;
  key:string="abc";

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




//Function to store the type of game in the dataset
  optionsSelected()
  {
    this.option.key=this._optionService.writeUserData(this.option);
    console.log('La llave es: ',this.key)
   }

  

}
