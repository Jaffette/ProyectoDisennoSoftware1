import { Component, OnInit, Input } from '@angular/core';
import { Options } from '../../interfaces/options.interface';
import { ActivatedRoute } from '@angular/router';
import { OptionsService } from '../../services/options.service';
import { RestService } from '../../services/rest.service';

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
    currentPlayer:"",
    ptsPlayerOne:0,
    ptsPlayerTwo:0,
    winner:'empty'
  };
  
  game:string;
  email:string;

  constructor( private activatedRoute: ActivatedRoute, private _optionService: OptionsService, 
    private _restService: RestService) 
  {
    this.activatedRoute.params.subscribe(params => {
      this.game= params['game']+'/';
      this.email= params['email'];
    });
      this.option.playerOne = this.email;
      this.option.game = this.game;
      this.option.currentPlayer = this.email;
      console.log(this.email);
   }
  createSession(){
    
    this._restService.createSession(this.option).subscribe(
      data =>{
        console.log(data);
      },
      err => {
        console.log("Error occured.")
      }
    )
  }

  ngOnInit() {
  }

}
