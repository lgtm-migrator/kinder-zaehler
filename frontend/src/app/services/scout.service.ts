import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {AngularFireFunctions} from "@angular/fire/functions";
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ScoutService {
  public scoutIds$: Observable<string[]>;
  public scoutsObservables$: Observable<Observable<{ scoutId: string, name: string }>[]>;
  
  private _joinScout = this.angularFireFunctions.httpsCallable('joinScout');
  private _createScout = this.angularFireFunctions.httpsCallable('createScout');

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireFunctions: AngularFireFunctions,
    private auth: AuthService) {
    this.scoutIds$ = this.angularFirestore
      .collection(`users`)
      .doc<{ scouts: string[] }>(this.auth.userId)
      .valueChanges().pipe(
        map((value => (value) ? value.scouts : [])),
        tap(val => console.log('received scoutIds: ', val))
      );

    this.scoutsObservables$ = this.scoutIds$.pipe(
      map((scoutIds) => {
        return scoutIds.map(scoutId => this.getScout$(scoutId));
      }),
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

  createScout(name: string) {
    this._createScout({
      name
    });
  }

  joinScout(scoutId: string) {
    this._joinScout({
      scoutId
    });
  }
}
