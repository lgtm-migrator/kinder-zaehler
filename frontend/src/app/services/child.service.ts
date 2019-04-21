import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map, tap} from "rxjs/operators";
import {Child} from "../models/child.model";
import {ScoutService} from "./scout.service";
import {AngularFireFunctions} from "@angular/fire/functions";

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  private _createChild = this.angularFireFunctions.httpsCallable('createChild');

  constructor(
    private scoutService: ScoutService,
    private angularFireFunctions: AngularFireFunctions,
  ) {
  }

  public getChildren$(scoutId: string): Observable<Child[]> {
    return this.scoutService.getScoutDoc(scoutId).collection<{ name: string }>('children').valueChanges().pipe(
      map((children) => {
        return children.map(({name}) => {
          return {name, loaded: true}
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
