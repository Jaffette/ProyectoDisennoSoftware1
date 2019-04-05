import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { NgModule } from '@angular/core';

const httpOptions = {
  headers: new HttpHeaders({
     'Access-Control-Allow-Origin': '*',
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class RestService {

  constructor(private http: HttpClient) { }
  endpoint = 'http://localhost:3000/api/memory/';
  
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
/**
 * 	"identifier":"asd",
	"gameType":"Memory",
	"level":"levelOne",
	"modality":"player vs player",
	"playerOne":"uri.arte08@gmail.com",
	"playerTwo":"jaffette.solano@gmail.com",
	"turnPlayerOne":"true",
    "turnPlayerTwo":"false",
    "ptsPlay1": 0,
    "ptsPlay2": 0, 
    "winner": 0
*/
  getMemory(){
    return this.http.get(this.endpoint,httpOptions);
  }
  createSession(object){
    let body = JSON.stringify(object);
    return this.http.post(this.endpoint+'createSesion',body,httpOptions);
  }
}

