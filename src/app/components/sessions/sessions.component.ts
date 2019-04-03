import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../../services/options.service';
import { UserService } from '../../services/user.service';



@Component({
  selector: 'app-sessions',
  templateUrl: './sessions.component.html',
  styleUrls: ['./sessions.component.css']
})
export class SessionsComponent implements OnInit {

  sessions:any=[];
  currentUser;
  constructor(private _optionService:OptionsService, private user:UserService) {
    
    this.showSessions();
   }

  ngOnInit() {
  }



  async showSessions(){
    this.sessions = await this._optionService.readSessionsAvailable(); 
    console.log('Los valores de sessions son: ',this.sessions)
  }


  showIndex(index){
    console.log('indice: ',index);
    console.log('clave para ese indice: ',this.sessions[index]);
    this._optionService.changeSessionStatus(this.sessions[index],this.user.showMail());
  }


}
