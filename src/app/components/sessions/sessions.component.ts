import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../../services/options.service';


@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  sessions;
  constructor(private _optionService:OptionsService) {
    this.showSessions();
   }

  ngOnInit() {
  }



  async showSessions(){
    this.sessions = await this._optionService.readSessionsAvailable(); 
    console.log('Los valores de sessions son: ',this.sessions)
  }


}
