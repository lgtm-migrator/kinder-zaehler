import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';
import {Scout} from '../../models/scout.model';

@Component({
  selector: 'app-scout-list',
  templateUrl: './scout-list.component.html',
  styleUrls: ['./scout-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoutListComponent {
  @Input() public scouts$: Observable<Scout[]>;
  @Output() public leaveScout: EventEmitter<string> = new EventEmitter();

  public emitLeaveScout(scoutId: string) {
    this.leaveScout.emit(scoutId);
  }
}
