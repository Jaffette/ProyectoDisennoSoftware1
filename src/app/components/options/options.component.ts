import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Options } from '../../interfaces/options.interface';


@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  option:Options=
  {
    game:"",
    modality:"",
    level:"",
  }

  constructor() { }

  ngOnInit() {
  }

}
