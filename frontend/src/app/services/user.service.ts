import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private angularFirestore: AngularFirestore,
    private authService: AuthService) {
  }

  public getUserDoc() {
    return this.angularFirestore
      .collection(`users`)
      .doc<{ scouts: string[] }>(this.authService.userId);
  }
}
