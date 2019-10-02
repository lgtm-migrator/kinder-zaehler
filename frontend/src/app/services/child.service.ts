import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {TroopService} from './troop.service';
import {AngularFireFunctions} from '@angular/fire/functions';
import {LoadedChild} from '../models/loaded-child.model';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  private _createChild = this.angularFireFunctions.httpsCallable('createChild');

  constructor(
    private troopService: TroopService,
    private angularFireFunctions: AngularFireFunctions
  ) {
  }

  public getChildren$(troopId: string): Observable<LoadedChild[]> {
    return this.troopService.getTroopDoc(troopId).collection<{ name: string, id: string }>('children').valueChanges({idField: 'id'}).pipe(
      map((children) => {
        return children.map(({name, id}) => {
          return <LoadedChild>{name, id, loaded: true};
        });
      }),
      tap(val => console.log('received children: ', val))
    );
  }

  public createChild(child: { name: string }, troopId: string) {
    console.log('create child');
    return this._createChild({name, troopId}).toPromise();
  }

  public setAttendance(troopId: string, child: LoadedChild, attendance: string) {
    this.troopService.getTroopDoc(troopId).collection('children').doc(child.id).collection('presence').doc('27-03-2000').set({
      attendance
    });
  }
}
