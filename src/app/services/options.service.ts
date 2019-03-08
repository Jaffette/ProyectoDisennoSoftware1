import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Options } from '../interfaces/options.interface';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable()
export class OptionsService {

  fireBaseURL:string = "https://proyectodisennosoftware2019.firebaseio.com/game_table.json"

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
}
