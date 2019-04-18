import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as firebase from 'firebase';

@Injectable()
export class MemoryService {

    
  database = firebase.database();


  constructor( private http:HttpClient ) { }



readDashBoard(level,game) 
{
        console.log('in fuction');
        var result;
        var ref = firebase.database().ref().child('Memorydashboards/levelThree');
        return new Promise (function (resolve){
            ref.on("value", snap =>{
            result = snap.child("dashboard").val();
            console.log('result in ref',result);
            resolve(result);
        });
    });

}



  

  

}
