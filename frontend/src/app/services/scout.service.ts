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

  private scouts$: { [scoutId: string]: Observable<{ scoutId: string, name: string }> } = {};
  private _joinScout = this.angularFireFunctions.httpsCallable('joinScout');
  private _createScout = this.angularFireFunctions.httpsCallable('createScout');
  private _leaveScout = this.angularFireFunctions.httpsCallable('leaveScout');

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireFunctions: AngularFireFunctions,
    private auth: AuthService) {
    this.scoutIds$ = this.getUserDoc()
      .valueChanges().pipe(
        map((value => (value) ? value.scouts : [])),
        tap(val => console.log('received scoutIds: ', val))
      );

    this.scoutsObservables$ = this.scoutIds$.pipe(
      map((scoutIds) => this.mapScoutIdsToScouts$(scoutIds)),
    );

  }

  public createScout(name: string) {
    return this._createScout({
      name
    }).toPromise();
  }

  public joinScout(scoutId: string) {
    this._joinScout({
      scoutId
    });
  }

  public leaveScout(scoutId: string) {
    this._leaveScout({
      scoutId
    });
  }

  private mapScoutIdsToScouts$(scoutIds: string[]): Observable<{ scoutId: string, name: string }>[] {
    return scoutIds.map(scoutId => {
      const newScouts$ = {};
      if (this.scouts$[scoutId] === undefined) {
        newScouts$[scoutId] = this.getScout$(scoutId);
      } else {
        newScouts$[scoutId] = this.scouts$[scoutId];
      }
      this.scouts$ = newScouts$;
      return newScouts$[scoutId];
    });
  }

  private getScout$(scoutId: string): Observable<{ name: string, scoutId: string }> {
    return this.getScoutDoc(scoutId).valueChanges().pipe(
      map((value) => {
        return {scoutId, name: value.name}
      }),
      tap(val => console.log('received scouts: ', val))
    )
  }

  private getScoutDoc(scoutId: string) {
    return this.angularFirestore
      .collection('scouts')
      .doc<{ name: string }>(scoutId);
  }

  private getUserDoc() {
    return this.angularFirestore
      .collection(`users`)
      .doc<{ scouts: string[] }>(this.auth.userId)
  }
}
