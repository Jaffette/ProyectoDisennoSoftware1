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
    game:"",
    route:""
  }
  
  sessions:any=[];
  currentUser;
  constructor(private _optionService:OptionsService, private user:UserService, private _optionObject: PassObject, private activatedRoute: ActivatedRoute, private _restService:RestService) {
    this.activatedRoute.params.subscribe(params => {
      this.options.game= params['game'];
      this.options.level= params['level']+'/';
      console.log('el juego que llega a la vara es ',this.options.game)
      if(this.options.game == 'Memory'){
        console.log("soy de memory");
        this.options.route = '/createSession/';
      }
      if(this.options.game == 'Othello'){
        console.log("soy de othello");
        this.options.route = '/gameScreen/';
      }
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

    if( this.options.game == 'Memory'){
    this._restService.joinSession(json).subscribe(
      data =>
      {
       console.log('data del Servicio en join session si soy de memoria',data)
      },
      err => 
      {
        console.log("Error occured.")
        return null
      }
    );}

    else{
      this._restService.joinOthelloSession(json).subscribe(
        data => {
          console.log('data del Servicio en join session si soy de othello',data)
        }, err =>
        {
          console.log("Error occured.")
        return null
        });
      }
    }
}
