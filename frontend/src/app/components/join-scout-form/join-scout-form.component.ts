import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-join-scout-form',
  templateUrl: './join-scout-form.component.html',
  styleUrls: ['./join-scout-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class JoinScoutFormComponent {
  @Output() public joinScout = new EventEmitter<string>();
  public scoutId = '';

  public onSubmit() {
    this.joinScout.emit(this.scoutId);
    this.scoutId = '';
  }
}
