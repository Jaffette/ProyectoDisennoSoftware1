import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../../services/options.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {
  options = {
    level:"",
    game:""
  }
  sessions:any=[];
  currentUser;
  constructor(private _optionService:OptionsService, private user:UserService, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.options.game= params['game'];
      this.options.level= params['level'];
    });
    this.showSessions();
   }

  ngOnInit() {
  }



  async showSessions(){
    this.sessions = await this._optionService.readSessionsAvailable(); 
   }


  showIndex(index){
    this._optionService.changeSessionStatus(this.sessions[index],this.user.showMail());
  }


}
