import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-decision',
  templateUrl: 'decision.component.html',
  styleUrls: ['decision.component.css']
})
export class DecisionComponent implements OnInit {


  active = true;

  constructor(public user: UserService) { }

  ngOnInit() {
  }

}
