import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Troop} from '../../models/troop.model';

@Component({
  selector: 'app-troop-list',
  templateUrl: './troop-list.component.html',
  styleUrls: ['./troop-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TroopListComponent {
  @Input() public troops$: Observable<Troop[]>;
  @Output() public leaveTroop: EventEmitter<string> = new EventEmitter();

  public emitLeaveTroop(troopId: string) {
    this.leaveTroop.emit(troopId);
  }
}
