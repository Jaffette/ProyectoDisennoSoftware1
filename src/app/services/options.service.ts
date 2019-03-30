import { Injectable } from '@angular/core';
import { Options } from '../interfaces/options.interface';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';

@Injectable()
export class OptionsService {
  
  database = firebase.database();
  date=new Date();

  constructor( private http:HttpClient ) { }

   writeUserData(object:Options) 
   {
  console.log(object.modality);
     if(object.modality == '/createSession/')
     {
      firebase.database().ref('games/').push({
        identifier : object.playerOne.substr(1,object.playerOne.length-1),
        playerOne: object.playerOne.substr(1,object.playerOne.length-1),
        turnPlayerOne: object.turnPlayerOne,
        playerTwo : 'empty',
        turnPlayerTwo : object.turnPlayerTwo,
        gameType: object.game,
        modality: object.modality.substr(1,object.modality.length-2),
        level : object.level.substr(0,object.level.length-1)
      });
     }
     else if (object.modality == '/againstmachine/')
     {
      firebase.database().ref('games/').push({
        identifier : object.playerOne.substr(1,object.playerOne.length-1),
        playerOne: object.playerOne.substr(1,object.playerOne.length-1),
        turnPlayerOne:'',
        playerTwo : null,
        turnPlayerTwo : null,
        gameType: object.game,
        modality: object.modality.substr(1,object.modality.length-2),
        level : object.level.substr(0,object.level.length-1)
      });
     }

  }

  readSessionsAvailable () 
  {
    console.log("In the function");
    var result = [];
    var ref = firebase.database().ref();
    return new Promise (function (resolve){
        ref.child('games').orderByChild('playerTwo').equalTo("empty").on("value",function(snapshot){
          console.log(snapshot.val());
          snapshot.forEach(function(data){
            console.log(data.key);
            if(!result.includes(data.key)){
            result.push(data.key);
          }
        }
          
          );
        });
        resolve(result);
      } );
    
    }
  
}
