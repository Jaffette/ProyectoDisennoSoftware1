import { Component, OnInit } from '@angular/core';
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

  game:string;
  constructor( private activatedRoute: ActivatedRoute, private _optionService: OptionsService ) 
  {
    this.activatedRoute.params.subscribe(params => {
      this.game= params['game']});
      this.option.game = this.game;
   }
  

  ngOnInit() {
  }
//Function to store the type of game in the dataset
  optionsSelected()
  {
    console.log(this.option);
    this._optionService.writeUserData(this.option.game,this.option.modality,this.option.level);
  }

}
