import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-create-troop-form',
  templateUrl: './create-troop-form.component.html',
  styleUrls: ['./create-troop-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateTroopFormComponent {
  @Output() public createTroop = new EventEmitter<string>();
  public troopName = '';
  public troopNameToShort = false;


  public onSubmit() {
    if (this.troopName.trim().length < 3) {
      this.troopNameToShort = true;
      return;
    }
    this.createTroop.emit(this.troopName);
    this.troopNameToShort = false;
    this.troopName = '';
  }
}
