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
    
    this._optionService.insertGame(this.option);
    console.log(this.option);
  }

}
