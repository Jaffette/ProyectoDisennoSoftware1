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
    var myRef = firebase.database().ref('games/').push();
    var key = myRef.key;
    var newData;
     if(object.modality == '/createSession/')
     {
     
        newData = {
        identifier : object.playerOne.substr(1,object.playerOne.length-1),
        playerOne: object.playerOne.substr(1,object.playerOne.length-1),
        playerTwo : 'empty',
        gameType: object.game,
        modality: object.modality.substr(1,object.modality.length-2),
        level : object.level.substr(0,object.level.length-1)
      }

     }
     else if (object.modality == '/againstmachine/')
     {
        newData={
        identifier : object.playerOne.substr(1,object.playerOne.length-1),
        playerOne: object.playerOne.substr(1,object.playerOne.length-1),
        turnPlayerOne:'',
        playerTwo : null,
        turnPlayerTwo : null,
        gameType: object.game,
        modality: object.modality.substr(1,object.modality.length-2),
        level : object.level.substr(0,object.level.length-1)
        }

     }
     myRef.set(newData);
     newData=null;
     return key;

  }

  readSessionsAvailable () 
  {
    var result = [];
    var ref = firebase.database().ref();
    return new Promise (function (resolve){
        ref.child('games').orderByChild('playerTwo').equalTo("").on("value",function(snapshot){
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

    changeSessionStatus(key:string,user){
      console.log('Current User: ',user);
      var updateRef = firebase.database().ref('games/');
      updateRef.child(key).update({"playerTwo":user});
     }

      
}
