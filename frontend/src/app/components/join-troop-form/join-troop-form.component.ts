import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-join-troop-form',
  templateUrl: './join-troop-form.component.html',
  styleUrls: ['./join-troop-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinTroopFormComponent {
  @Output() public joinTroop = new EventEmitter<string>();
  public troopId = '';

  public onSubmit() {
    this.joinTroop.emit(this.troopId);
    this.troopId = '';
  }
}
