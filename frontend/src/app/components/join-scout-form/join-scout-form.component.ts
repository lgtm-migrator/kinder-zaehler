import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-join-scout-form',
  templateUrl: './join-scout-form.component.html',
  styleUrls: ['./join-scout-form.component.scss']
})
export class JoinScoutFormComponent {
  @Output() joinScout = new EventEmitter<string>();
  public scoutId: string = '';

  onSubmit() {
    this.joinScout.emit(this.scoutId);
    this.scoutId = '';
  }
}
