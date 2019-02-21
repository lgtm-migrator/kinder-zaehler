import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import * as firebase from 'firebase/app'
import 'firebase/auth'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
  }

  get user$() {
    return this.angularFireAuth.authState;
  }

  get userId() {
    return this.angularFireAuth.auth.currentUser.uid;
  }

  public signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  public signInWithEmailAndPassword() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  public signOut() {
    this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  private oAuthLogin(provider) {
    return this.angularFireAuth.auth.signInWithPopup(provider);
  }
}
