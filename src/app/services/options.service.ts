import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Options } from '../interfaces/options.interface';
import { map, catchError, retry } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable()
export class OptionsService {

  database = firebase.database();

  constructor( private http:HttpClient) { }

  insertGame(option:Options)
  {
    let body = JSON.stringify(option);

    //petición del encabezado de la petición
    let headers = new HttpHeaders
    ({
       'Content-Type':'application/json'
    });

   /* return this.http.post( this.fireBaseURL, body, {headers} )
    map( res=>{ 
      console.log(res.json())
      return res.json()});*/

  }
   writeUserData(play,modal,lvl) {
    firebase.database().ref('games/').set({
      gameType: play,
      modality: modal,
      level : lvl
    });
  }
}
