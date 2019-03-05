import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-scout-list',
  templateUrl: './scout-list.component.html',
  styleUrls: ['./scout-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoutListComponent {
  @Input() public scoutsObservables$: Observable<Observable<{ scoutId: string, name: string, isDeleted?: boolean }>[]>;
  @Input() public loadingScoutNames$: Observable<string[]>;
  @Output() public leaveScout: EventEmitter<string> = new EventEmitter();

  public emitLeaveScout(scout: { scoutId: string, name: string, isDeleted?: boolean }) {
    scout.isDeleted = true;
    this.leaveScout.emit(scout.scoutId)
  }
}
