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

  paintBoard(object)
  {
    let body = JSON.stringify(object);
    console.log(body);
    return this.http.post(this.endpoint+'getSession',body,httpOptions).toPromise();
  }
  updateRefreshValuePlayOne(object){
    let body = JSON.stringify(object);
    console.log("body in refresh",body);
    return this.http.post(this.endpoint+'updateRefreshValuePlayOne',body,httpOptions).toPromise();
  }
  updateRefreshValuePlayTwo(object){
    let body = JSON.stringify(object);
    console.log("body in refresh",body);
    return this.http.post(this.endpoint+'updateRefreshValuePlayTwo',body,httpOptions).toPromise();
  }
  askToRefreshPlayOne(object){
    let body = JSON.stringify(object);
    console.log("body in refresh",body);
    return this.http.post(this.endpoint+'askToRefreshPlayOne',body,httpOptions).toPromise();
  }
  askToRefreshPlayTwo(object){
    let body = JSON.stringify(object);
    console.log("body in refresh",body);
    return this.http.post(this.endpoint+'askToRefreshPlayTwo',body,httpOptions).toPromise();
  }
  getRefreshValuePlayOne(object){
    let body = JSON.stringify(object);
    console.log("body in refresh",body);
    return this.http.post(this.endpoint+'getRefreshValuePlayOne',body,httpOptions).toPromise();
  }
  getRefreshValuePlayTwo(object){
    let body = JSON.stringify(object);
    console.log("body in refresh",body);
    return this.http.post(this.endpoint+'getRefreshValuePlayTwo',body,httpOptions).toPromise();
  }

  sendMessage(object)
  {
    let body = JSON.stringify(object);
    console.log("body in sendMessage");
    return this.http.post(this.endpoint+'setMessage',body,httpOptions).toPromise();
  }

  getMessage(object)
  {
    let body = JSON.stringify(object);
    return this.http.post(this.endpoint+'getMessage',body,httpOptions);
  }
}

