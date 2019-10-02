import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {TroopService} from './troop.service';
import {AngularFireFunctions} from '@angular/fire/functions';
import {LoadedScout} from '../models/loaded-scout.model';

@Injectable({
  providedIn: 'root'
})
export class ScoutService {

  private _createScout = this.angularFireFunctions.httpsCallable('createScout');

  constructor(
    private troopService: TroopService,
    private angularFireFunctions: AngularFireFunctions
  ) {
  }

  public getScouts$(troopId: string): Observable<LoadedScout[]> {
    return this.troopService.getTroopDoc(troopId).collection<{ name: string, id: string }>('scouts').valueChanges({idField: 'id'}).pipe(
      map((scouts) => {
        return scouts.map(({name, id}) => {
          return <LoadedScout>{name, id, loaded: true};
        });
      }),
      tap(val => console.log('received scouts: ', val))
    );
  }

  public createScout(scout: { name: string }, troopId: string) {
    console.log('create scout');
    return this._createScout({name, troopId}).toPromise();
  }

  public setAttendance(troopId: string, scout: LoadedScout, attendance: string) {
    this.troopService.getTroopDoc(troopId).collection('scouts').doc(scout.id).collection('presence').doc('27-03-2000').set({
      attendance
    });
  }
}
