import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-game',
  templateUrl: './create-game.component.html',
  styleUrls: ['./create-game.component.css']
})
export class CreateGameComponent implements OnInit {

  public loading : boolean;

  constructor() {
    this.loading = true;
   }

  ngOnInit() {
  }

}
