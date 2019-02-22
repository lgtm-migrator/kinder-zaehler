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

  public async signInWithEmailAndPassword(email: string, password: string) {
    await this.angularFireAuth.auth.signInWithEmailAndPassword(email, password);
  }

  public signOut() {
    this.angularFireAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  signUpWithEmailAndPassword(email: string, password: string) {
    this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  private oAuthLogin(provider) {
    return this.angularFireAuth.auth.signInWithPopup(provider);
  }
}
