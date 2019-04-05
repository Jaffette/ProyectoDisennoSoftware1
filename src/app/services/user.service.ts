import { Injectable, NgZone } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { auth } from 'firebase';

import { of as observableOf } from 'rxjs';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import { map } from 'rxjs/operators';
import { mapChildrenIntoArray } from '@angular/router/src/url_tree';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  uid = this.afAuth.authState.pipe(
    map(authState => {
      if (!authState) {
      return null;
    } else {
      return authState.uid;
    }
  } ));
  isAdmin = observableOf(true);
  constructor(private afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone) { }
  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
    .then((result) => 
    this.ngZone.run(() => {
    this.router.navigate(['home']);
    }));

  }
  logout() {
    this.afAuth.auth.signOut()
    .then((result) =>
    this.ngZone.run(() => {
    this.router.navigate(['login']);
    }));
  }

  showName(){
    var user = auth().currentUser;
    if (user){
      return user.displayName;
    }
    
  }

  showProfilePicture(){
    var user = auth().currentUser;
    if (user){
      return user.photoURL;
    }
    
  }

  showMail()
  {
    var mail = auth().currentUser;
    if(mail)
    {
      return mail.email;
    }
  }
  


}
