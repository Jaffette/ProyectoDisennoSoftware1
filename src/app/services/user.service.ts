import { Injectable, NgZone } from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import { auth } from 'firebase';

import { of as observableOf } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

import { map } from 'rxjs/operators';
import { routerNgProbeToken } from '@angular/router/src/router_module';


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
    // this.afAuth.auth.signInWithPopup(new auth.FacebookAuthProvider());


  }
  logout() {
    this.afAuth.auth.signOut()
    .then((result) =>
    this.ngZone.run(() => {
    this.router.navigate(['login']);
    }));
  }
}
