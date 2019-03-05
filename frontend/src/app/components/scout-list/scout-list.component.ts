import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {Observable} from "rxjs";

@Component({
  selector: 'app-scout-list',
  templateUrl: './scout-list.component.html',
  styleUrls: ['./scout-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScoutListComponent {
  @Input() scoutsObservables$: Observable<Observable<{ scoutId: string, name: string }>[]>;
}
