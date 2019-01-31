import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ScoutService {
  public scoutIds$: Observable<string[]>;

  constructor(private angularFirestore: AngularFirestore, private auth: AuthService) {
    this.scoutIds$ = this.angularFirestore
      .collection(`users`)
      .doc<{ scouts: string[] }>(this.auth.userId)
      .valueChanges().pipe(
        map((value => value.scouts)),
        tap(val => console.log('received scoutIds: ', val))
      );
  }

  getScout$(scoutId: string): Observable<{ name: string, scoutId: string }> {
    return this.angularFirestore.collection('scouts').doc<{ name: string }>(scoutId).valueChanges().pipe(
      map((value) => {
        return {scoutId, name: value.name}
      }),
      tap(val => console.log('received scouts: ', val))
    )
  }
}
