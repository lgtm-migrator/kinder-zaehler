import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {Child} from "../models/child.model";
import {ScoutService} from "./scout.service";

@Injectable({
  providedIn: 'root'
})
export class ChildService {

  constructor(private scoutService: ScoutService) {
  }

  public getChildren$(scoutId: string): Observable<Child[]> {
    return this.scoutService.getScoutDoc(scoutId).collection<Child>('children').valueChanges().pipe(
      tap(val => console.log('received children: ', val))
    );
  }
}
