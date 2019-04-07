import { Injectable } from '@angular/core';
import { Options } from '../interfaces/options.interface';

@Injectable()
export class PassObject
{
    objectBackUp:Options;
    var1;
    var2;
    tokenParaJoin;

    setObject(objectReceived:Options)
    {
        this.objectBackUp = objectReceived;
    }

    setToken(t){
        this.tokenParaJoin = t;
        console.log("El valor de respaldo del token en el servicio es: ",this.tokenParaJoin)
    }
    
    setVar1(msg){
        this.var1 = msg;
        this.var2 = "GG"

    }

    setVar2(msg){
        this.var1 = "GG";
        this.var2 = msg

    }

    getObject()
    {
        return this.objectBackUp;
    }

}