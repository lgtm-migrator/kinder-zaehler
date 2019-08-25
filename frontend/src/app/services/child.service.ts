import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {ScoutService} from './scout.service';
import {AngularFireFunctions} from '@angular/fire/functions';
import {LoadedChild} from '../models/loaded-child.model';

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  private _createChild = this.angularFireFunctions.httpsCallable('createChild');

  constructor(
    private scoutService: ScoutService,
    private angularFireFunctions: AngularFireFunctions
  ) {
  }

  public getChildren$(scoutId: string): Observable<LoadedChild[]> {
    return this.scoutService.getScoutDoc(scoutId).collection<{ name: string, id: string }>('children').valueChanges({idField: 'id'}).pipe(
      map((children) => {
        return children.map(({name, id}) => {
          return <LoadedChild>{name, id, loaded: true};
        });
      }),
      tap(val => console.log('received children: ', val))
    );
  }

  public createChild(child: { name: string }, scoutId: string) {
    console.log('create child');
    return this._createChild({name, scoutId}).toPromise();
  }
}
