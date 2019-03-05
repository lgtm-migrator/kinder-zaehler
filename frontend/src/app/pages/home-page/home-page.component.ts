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
  private scoutsObservables$: Observable<Observable<{ scoutId: string, name: string }>[]>;

  constructor(public scoutService: ScoutService) {
    this.scoutsObservables$ = this.scoutService.scoutsObservables$;
  }

  joinScout(scoutId: string) {
    this.scoutService.joinScout(scoutId);
  }

  createScout(scoutName: string) {
    this.scoutService.createScout(scoutName);
  }
}
