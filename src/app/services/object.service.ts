import { Injectable } from '@angular/core';
import { Options } from '../interfaces/options.interface';

@Injectable()
export class PassObject
{
    objectBackUp:Options;

    setObject(objectReceived:Options)
    {
        this.objectBackUp = objectReceived;
    }

    getObject()
    {
        return this.objectBackUp;
    }

}