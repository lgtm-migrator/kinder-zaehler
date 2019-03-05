import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {ScoutService} from "../../services/scout.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  private scoutsObservables$: Observable<Observable<{ scoutId: string, name: string }>[]>;
  private loadingScoutNames: string[] = [];
  private loadingScoutNames$: Subject<string[]> = new Subject();

  constructor(public scoutService: ScoutService) {
    this.scoutsObservables$ = this.scoutService.scoutsObservables$;
  }

  public joinScout(scoutId: string) {
    this.scoutService.joinScout(scoutId);
  }

  public async createScout(scoutName: string) {
    this.loadingScoutNames = [...this.loadingScoutNames, scoutName];
    this.loadingScoutNames$.next(this.loadingScoutNames);

    await this.scoutService.createScout(scoutName);

    this.loadingScoutNames = this.loadingScoutNames.filter(loadingScoutName => loadingScoutName !== scoutName);
    this.loadingScoutNames$.next(this.loadingScoutNames);
  }
}
