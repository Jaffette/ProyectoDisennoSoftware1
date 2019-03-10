import { Component, OnInit, Input } from '@angular/core';
import { Options } from '../../interfaces/options.interface';
import { ActivatedRoute } from '@angular/router'
import { OptionsService } from '../../services/options.service';
import { stringify } from '@angular/core/src/render3/util';



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
  };

 
  optionsSelected()
  {
    
    this._optionService.insertGame(this.option);
    console.log(this.option);
  }

 print()
  {
    console.log(this.option.modality);
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


}
