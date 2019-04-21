import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
     'Access-Control-Allow-Origin': '*',
    'Content-Type':  'application/json'
  })
};
@Injectable()
export class RestService {

  constructor(private http: HttpClient) { }
  //endpointMemory ='http://localhost:3000/api/memory/';
  endpointMemory = 'https://api-rest-games.herokuapp.com/api/memory/';
  endpointOthello = 'https://api-rest-games.herokuapp.com/api/othello/';
  //endpointOthello = 'http://localhost:3000/api/othello/';
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getMemory(){
    return this.http.get(this.endpointMemory,httpOptions);
  }
  createSession(object){
    let body = JSON.stringify(object);
    return this.http.post(this.endpointMemory+'createSesion',body,httpOptions);
  }
  createOthelloSession(object){
    let body = JSON.stringify(object);
    return this.http.post(this.endpointOthello+'createOthelloGame',body,httpOptions);
  }
  
  play(object)
  {
    let body = JSON.stringify(object);
    return this.http.post(this.endpointMemory+'playGame',body,httpOptions);
  }

  playOthello(object)
  {
    let body = JSON.stringify(object);
    console.log(body);
    return this.http.post(this.endpointOthello+'playOthello',body,httpOptions).toPromise();
  }

  confirmSecondPlayer(object)
  {
    let body = JSON.stringify(object);
    return this.http.post(this.endpointMemory+'sessionComplete',body,httpOptions).toPromise();
  }
  
  getMemorySessions(object)
  {
    let body = JSON.stringify(object);
    return this.http.post(this.endpointMemory+'getMemorySessions',body,httpOptions);
  }

  getSessionOthello(object)
  {
    let body = JSON.stringify(object);
    return this.http.post(this.endpointOthello+'getSessionOthello',body,httpOptions).toPromise();
  }

  joinSession(object)
  {
    let body = JSON.stringify(object);
    return this.http.post(this.endpointMemory+'joinSession',body,httpOptions);
  }
  joinOthelloSession(object)
  {
    let body = JSON.stringify(object);
    return this.http.post(this.endpointOthello+'joinToOthelloSession',body,httpOptions);
  }

  paintBoard(object)
  {
    let body = JSON.stringify(object);
    return this.http.post(this.endpointMemory+'getSession',body,httpOptions).toPromise();
  }
  updateRefreshValue(object){
    let body = JSON.stringify(object);
    return this.http.post(this.endpointMemory+'updateRefreshValue',body,httpOptions).toPromise();
  }
  
  getRefreshValue(object){
    let body = JSON.stringify(object);
    console.log(body)
    return this.http.post(this.endpointMemory+'getRefreshValue',body,httpOptions).toPromise();
  }

  sendMessage(object)
  {
    let body = JSON.stringify(object);
    console.log("body in sendMessage");
    return this.http.post(this.endpointMemory+'setMessage',body,httpOptions).toPromise();
  }

  getMessage(object)
  {
    let body = JSON.stringify(object);
    return this.http.post(this.endpointMemory+'getMessage',body,httpOptions);
  }

  consultOthelloWinner(object){
    let body = JSON.stringify(object);
    return this.http.post(this.endpointOthello+'consultWinner',body,httpOptions).toPromise();
  }

  consultMemoryWinner(object){
    let body = JSON.stringify(object);
    return this.http.post(this.endpointMemory+'consultWinner',body,httpOptions).toPromise();
  }
  
  displayStatistics(object){
    console.log("AL API");
    let body = JSON.stringify(object);
    console.log(body)
    return this.http.post(this.endpointOthello+'consultStatistics',body,httpOptions).toPromise();
  }


}

