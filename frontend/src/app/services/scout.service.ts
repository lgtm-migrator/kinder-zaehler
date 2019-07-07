import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireFunctions} from '@angular/fire/functions';
import {BehaviorSubject, combineLatest, Observable, Subject, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Scout} from '../models/scout.model';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ScoutService {
  public scoutIds$: Observable<string[]>;
  public scouts$: Observable<Scout[]>;

  private scoutDocs$: Subject<Scout[]> = new BehaviorSubject([]);
  private reloadScouts$: Subject<void> = new BehaviorSubject(undefined);
  private scoutObservablesCache: { [scoutId: string]: Observable<Scout> } = {};
  private loadingScoutNames: Set<string> = new Set();
  private deletedScoutIds: Set<string> = new Set();

  private _joinScout = this.angularFireFunctions.httpsCallable('joinScout');
  private _createScout = this.angularFireFunctions.httpsCallable('createScout');
  private _leaveScout = this.angularFireFunctions.httpsCallable('leaveScout');

  private scoutsObservables$$: Subscription = null;
  private scoutDocs$$: Subscription = null;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireFunctions: AngularFireFunctions,
    private userService: UserService
  ) {
    this.scoutIds$ = this.userService.getUserDoc()
      .valueChanges().pipe(
        map((value => (value) ? value.scouts : [])),
        tap(val => console.log('received scoutIds: ', val))
      );

    this.scouts$ = combineLatest(this.scoutDocs$, this.reloadScouts$).pipe(
      map(([scouts]: [Scout[], void]) => {
        scouts.forEach(scout => {
          if (this.loadingScoutNames.has(scout.name)) {
            this.loadingScoutNames.delete(scout.name);
          }

          if (!this.deletedScoutIds.has(scout.scoutId)) {
            this.deletedScoutIds.delete(scout.scoutId);
          }
        });

        const filteredScouts = scouts
          .filter(scout => !this.deletedScoutIds.has(scout.scoutId));

        const loadingScouts = this.getLoadingScouts();
        return [...filteredScouts, ...loadingScouts];
      })
    );

    this.scoutsObservables$$ = this.scoutIds$.pipe(
      map((scoutIds) => this.mapScoutIdsToScouts$(scoutIds))
    ).subscribe((scoutObservables => {
      if (this.scoutDocs$$) {
        this.scoutDocs$$.unsubscribe();
      }
      this.scoutDocs$$ = combineLatest(...scoutObservables).subscribe((scouts => {
        this.scoutDocs$.next(scouts);
      }));
    }));
  }

  public createScout(name: string) {
    this.loadingScoutNames.add(name);
    this.reloadScouts$.next();

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
    this.deletedScoutIds.add(scoutId);
    this.reloadScouts$.next();

    return this._leaveScout({
      scoutId
    }).toPromise();
  }

  public getScoutDoc(scoutId: string) {
    return this.angularFirestore
      .collection('scouts')
      .doc<{ name: string }>(scoutId);
  }

  public getScout$(scoutId: string): Observable<Scout> {
    return this.getScoutDoc(scoutId).valueChanges().pipe(
      map((value) => {
        return {scoutId, name: value.name, isLoading: false};
      }),
      tap(val => console.log('received scout: ', val))
    );
  }

  private mapScoutIdsToScouts$(scoutIds: string[]): Observable<Scout>[] {
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

  private getLoadingScouts() {
    const loadingScouts: Scout[] = [];
    for (const scoutName of this.loadingScoutNames) {
      loadingScouts.push({
        scoutId: undefined,
        name: scoutName,
        isLoading: true
      });
    }
    return loadingScouts;
  }
}

