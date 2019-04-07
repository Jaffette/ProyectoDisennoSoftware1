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

  getMemory(){
    return this.http.get(this.endpoint,httpOptions);
  }
  createSession(object){
    let body = JSON.stringify(object);
    console.log(body);
    return this.http.post(this.endpoint+'createSesion',body,httpOptions);
  }
  
  play(object)
  {
    let body = JSON.stringify(object);
    console.log(body);
    return this.http.post(this.endpoint+'playGame',body,httpOptions);
  }

  confirmSecondPlayer(object)
  {
    let body = JSON.stringify(object);
    console.log('Body del servicio',body);
    return this.http.post(this.endpoint+'sessionComplete',body,httpOptions).toPromise();
  }
  
  getMemorySessions(object)
  {
    let body = JSON.stringify(object);
    return this.http.post(this.endpoint+'getMemorySessions',body,httpOptions);
  }

  joinSession(object)
  {
    let body = JSON.stringify(object);
    console.log(body);
    return this.http.post(this.endpoint+'joinSession',body,httpOptions);
  }



}

