import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Observable} from 'rxjs';
import {Troop} from '../../models/troop.model';
import {TroopService} from '../../services/troop.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  public troops$: Observable<Troop[]>;

  constructor(public troopService: TroopService) {
    this.troops$ = this.troopService.troops$;
  }

  public joinTroop(troopId: string) {
    this.troopService.joinTroop(troopId);
  }

  public async createTroop(troopName: string) {
    await this.troopService.createTroop(troopName);
  }

  public async leaveTroop(troopId: string) {
    await this.troopService.leaveTroop(troopId);
  }
}
