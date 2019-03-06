import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-scout-list',
  templateUrl: './scout-list.component.html',
  styleUrls: ['./scout-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoutListComponent {
  @Input() public scouts$: Observable<{ scoutId: string, name: string, isLoading?: boolean }[]>;
  @Output() public leaveScout: EventEmitter<string> = new EventEmitter();

  public emitLeaveScout(scout: { scoutId: string, name: string, isDeleted?: boolean }) {
    this.leaveScout.emit(scout.scoutId);
  }
}
