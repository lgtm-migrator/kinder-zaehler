import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {AngularFireFunctions} from '@angular/fire/functions';
import {BehaviorSubject, combineLatest, Observable, Subject, Subscription} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Troop} from '../models/troop.model';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TroopService {
  public troopIds$: Observable<string[]>;
  public troops$: Observable<Troop[]>;

  private troopDocs$: Subject<Troop[]> = new BehaviorSubject([]);
  private reloadTroops$: Subject<void> = new BehaviorSubject(undefined);
  private troopObservablesCache: { [troopId: string]: Observable<Troop> } = {};
  private loadingTroopNames: Set<string> = new Set();
  private deletedTroopIds: Set<string> = new Set();

  private _joinTroop = this.angularFireFunctions.httpsCallable('joinTroop');
  private _createTroop = this.angularFireFunctions.httpsCallable('createTroop');
  private _leaveTroop = this.angularFireFunctions.httpsCallable('leaveTroop');

  private troopsObservables$$: Subscription = null;
  private troopDocs$$: Subscription = null;

  constructor(
    private angularFirestore: AngularFirestore,
    private angularFireFunctions: AngularFireFunctions,
    private userService: UserService
  ) {
    this.troopIds$ = this.userService.getUserDoc()
      .valueChanges().pipe(
        map((value => (value) ? value.troops : [])),
        tap(val => console.log('received troopIds: ', val))
      );

    this.troops$ = combineLatest([this.troopDocs$, this.reloadTroops$]).pipe(
      map(([troops]: [Troop[], void]) => {
        troops.forEach(troop => {
          if (this.loadingTroopNames.has(troop.name)) {
            this.loadingTroopNames.delete(troop.name);
          }

          if (!this.deletedTroopIds.has(troop.troopId)) {
            this.deletedTroopIds.delete(troop.troopId);
          }
        });

        const filteredTroops = troops
          .filter(troop => !this.deletedTroopIds.has(troop.troopId));

        const loadingTroops = this.getLoadingTroops();
        return [...filteredTroops, ...loadingTroops];
      })
    );

    this.troopsObservables$$ = this.troopIds$.pipe(
      map((troopIds) => this.mapTroopIdsToTroops$(troopIds))
    ).subscribe((troopObservables => {
      if (this.troopDocs$$) {
        this.troopDocs$$.unsubscribe();
      }
      this.troopDocs$$ = combineLatest(...troopObservables).subscribe((troops => {
        this.troopDocs$.next(troops);
      }));
    }));
  }

  public createTroop(name: string) {
    this.loadingTroopNames.add(name);
    this.reloadTroops$.next();

    return this._createTroop({
      name
    }).toPromise();
  }

  public joinTroop(troopId: string) {
    this._joinTroop({
      troopId
    });
  }

  public leaveTroop(troopId: string) {
    this.deletedTroopIds.add(troopId);
    this.reloadTroops$.next();

    return this._leaveTroop({
      troopId
    }).toPromise();
  }

  public getTroopDoc(troopId: string) {
    return this.angularFirestore
      .collection('troops')
      .doc<{ name: string }>(troopId);
  }

  public getTroop$(troopId: string): Observable<Troop> {
    return this.getTroopDoc(troopId).valueChanges().pipe(
      map((value) => {
        return {troopId, name: value.name, isLoading: false};
      }),
      tap(val => console.log('received troop: ', val))
    );
  }

  private mapTroopIdsToTroops$(troopIds: string[]): Observable<Troop>[] {
    return troopIds.map(troopId => {
      const newTroops$ = {};
      if (this.troopObservablesCache[troopId] === undefined) {
        newTroops$[troopId] = this.getTroop$(troopId);
      } else {
        newTroops$[troopId] = this.troopObservablesCache[troopId];
      }
      this.troopObservablesCache = newTroops$;
      return newTroops$[troopId];
    });
  }

  private getLoadingTroops() {
    const loadingTroops: Troop[] = [];
    for (const troopName of this.loadingTroopNames) {
      loadingTroops.push({
        troopId: undefined,
        name: troopName,
        isLoading: true
      });
    }
    return loadingTroops;
  }
}

