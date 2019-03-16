import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-decision',
  templateUrl: 'decision.component.html',
  styleUrls: ['decision.component.css']
})
export class DecisionComponent implements OnInit {

  name:string;
  profilePicture:any;
  active = true;

  constructor(public user: UserService) { 
    this.name=user.showName();
    this.profilePicture=user.showProfilePicture();
  }

  ngOnInit() {
  }

}
