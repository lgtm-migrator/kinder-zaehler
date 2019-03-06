import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Scout} from "../../models/scout.model";
import {ScoutService} from '../../services/scout.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  public scouts$: Observable<Scout[]>;

  constructor(public scoutService: ScoutService) {
    this.scouts$ = this.scoutService.scouts$;
  }

  public joinScout(scoutId: string) {
    this.scoutService.joinScout(scoutId);
  }

  public async createScout(scoutName: string) {
    await this.scoutService.createScout(scoutName);
  }

  public async leaveScout(scoutId: string) {
    await this.scoutService.leaveScout(scoutId);
  }
}
