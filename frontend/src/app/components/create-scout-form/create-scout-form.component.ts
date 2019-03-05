import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-create-scout-form',
  templateUrl: './create-scout-form.component.html',
  styleUrls: ['./create-scout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateScoutFormComponent {
  @Output() public createScout = new EventEmitter<string>();
  public scoutName: string = '';
  public scoutNameToShort = false;


  public onSubmit() {
    if (this.scoutName.trim().length < 3) {
      this.scoutNameToShort = true;
      return;
    }
    this.createScout.emit(this.scoutName);
    this.scoutNameToShort = false;
    this.scoutName = "";
  }
}
