import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from "rxjs";
import {ScoutService} from "../../services/scout.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  public scoutIds$: Observable<string[]>;
  public newScoutName: string = '';
  public newScoutError = false;
  public joinScoutId: string = '';
  private scoutObservables: { [scoutId: string]: Observable<{ scoutId: string, name: string }> } = {};

  constructor(public scoutService: ScoutService) {
    this.scoutIds$ = scoutService.scoutIds$;
  }

  getScout$(scoutId: string): Observable<{ scoutId: string, name: string }> {
    if (this.scoutObservables[scoutId] === undefined) {
      this.scoutObservables[scoutId] = this.scoutService.getScout$(scoutId);
    }
    return this.scoutObservables[scoutId];
  }

  joinScout() {
    this.scoutService.joinScout(this.joinScoutId);
    this.joinScoutId = '';
  }

  createScout() {
    if (this.newScoutName.trim().length < 3) {
      this.newScoutError = true;
      return;
    }
    this.scoutService.createScout(this.newScoutName);
    this.newScoutError = false;
    this.newScoutName = "";
  }
}
