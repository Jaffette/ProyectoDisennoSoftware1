import { Component, OnInit } from '@angular/core';
import {UserService } from '../../services/user.service';
import { RestService } from '../../services/rest.service';
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {
  email;
  gamesWon;
  gamesPlayed;
  gamesLost;
  constructor(private _restService: RestService, private _user:UserService) { 
    this.email = _user.showMail();
    

  }

  ngOnInit() {
    this.displayStatistic();
  }


    async displayStatistic(){
      var json = {player:this.email};
      await this._restService.displayStatistics(json).then( 
        data=>{
          this.gamesWon = data['gamesWon'];
          console.log(data['gamesWon'])
          this.gamesPlayed = data['totalGamesPlayed'];
          console.log(data['totalGamesPlayed'])
        },
        err=>{
          alert("Error while calculating statistics");
        }
      );
      this.gamesLost = this.gamesPlayed-this.gamesWon;
    }



    
}
