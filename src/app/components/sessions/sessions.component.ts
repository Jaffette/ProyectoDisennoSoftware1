import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../../services/options.service';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { RestService } from '../../services/rest.service'
import { PassObject } from '../../services/object.service';



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
  constructor(private _optionService:OptionsService, private user:UserService, private _optionObject: PassObject, private activatedRoute: ActivatedRoute, private _restService:RestService) {
    this.activatedRoute.params.subscribe(params => {
      this.options.game= params['game'];
      this.options.level= params['level']+'/';
      console.log('Para la vara de la ruta',this.options)
    });
  this._optionObject.setVar2("join");
   }

  ngOnInit() {
    this.showSessions();
  }

  showSessions(){
    var json = {level:this.options.level, game:this.options.game+'/'};
    console.log(json);
    this._restService.getMemorySessions(json).subscribe(
      data =>
      {
        console.log(data);
        this.sessions = data;

      },
      err => 
      {
        console.log("Error occured.")
        return null
      }
    );
  }

  joinSessions(i)
  {
    this._optionObject.setToken(this.sessions[i]['token']);
    console.log('Token del joinSession',this.sessions[i]['token'] )
    var json = {token:this.sessions[i]['token'], email:this.user.showMail()};
    this._restService.joinSession(json).subscribe(
      data =>
      {
       console.log('data del Servicio en join session',data)
      },
      err => 
      {
        console.log("Error occured.")
        return null
      }
    );
  }
}
