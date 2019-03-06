import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireFunctions} from '@angular/fire/functions';
import {combineLatest, Observable, Subject, Subscription} from 'rxjs';
import {map, tap,} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ScoutService {
  public scoutIds$: Observable<string[]>;
  public scoutsObservables$: Observable<Observable<{ scoutId: string, name: string }>[]>;
  public scouts$: Subject<{ scoutId: string, name: string }[]> = new Subject();

  private scoutObservablesCache: { [scoutId: string]: Observable<{ scoutId: string, name: string }> } = {};
  private _joinScout = this.angularFireFunctions.httpsCallable('joinScout');
  private _createScout = this.angularFireFunctions.httpsCallable('createScout');
  private _leaveScout = this.angularFireFunctions.httpsCallable('leaveScout');

  private scoutsObservables$$: Subscription = null;
  private scouts$$: Subscription = null;

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

    this.scoutsObservables$$ = this.scoutsObservables$.subscribe((scoutObservables => {
      if (this.scouts$$) {
        this.scouts$$.unsubscribe();
      }
      this.scouts$$ = combineLatest(...scoutObservables).subscribe((scouts => {
        this.scouts$.next(scouts);
      }));
    }));

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
    return this._leaveScout({
      scoutId
    }).toPromise();
  }

  private mapScoutIdsToScouts$(scoutIds: string[]): Observable<{ scoutId: string, name: string }>[] {
    return scoutIds.map(scoutId => {
      const newScouts$ = {};
      if (this.scoutObservablesCache[scoutId] === undefined) {
        newScouts$[scoutId] = this.getScout$(scoutId);
      } else {
        newScouts$[scoutId] = this.scoutObservablesCache[scoutId];
      }
      this.scoutObservablesCache = newScouts$;
      return newScouts$[scoutId];
    });
  }

  private getScout$(scoutId: string): Observable<{ name: string, scoutId: string }> {
    return this.getScoutDoc(scoutId).valueChanges().pipe(
      map((value) => {
        return {scoutId, name: value.name};
      }),
      tap(val => console.log('received scouts: ', val))
    );
  }

  private getScoutDoc(scoutId: string) {
    return this.angularFirestore
      .collection('scouts')
      .doc<{ name: string }>(scoutId);
  }

  private getUserDoc() {
    return this.angularFirestore
      .collection(`users`)
      .doc<{ scouts: string[] }>(this.auth.userId);
  }
}
