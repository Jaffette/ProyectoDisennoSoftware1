import { Injectable } from '@angular/core';
import { Options } from '../interfaces/options.interface';

@Injectable()
export class objectPass
{
    objectBackup:Options;

    setObject(objectOptions:Options)
    {
        this.objectBackup = objectOptions;
    }
    getObject()
    {
        return this.objectBackup;
    }

}