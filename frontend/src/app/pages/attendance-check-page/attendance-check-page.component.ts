import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ScoutService} from '../../services/scout.service';
import {Subject, Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {LoadedScout} from '../../models/loaded-scout.model';

@Component({
  selector: 'app-attendance-check-page',
  templateUrl: './attendance-check-page.component.html',
  styleUrls: ['./attendance-check-page.component.scss']
})
export class AttendanceCheckPageComponent implements OnInit, OnDestroy {
  public scout$: Subject<LoadedScout> = new Subject();
  public status$: Subject<{ checked: number, all: number }> = new Subject();

  private scouts: LoadedScout[] | null = null;
  private troopId: string = undefined;
  private checkedIds: Set<string> = new Set();

  private scouts$$: Subscription = Subscription.EMPTY;
  private params$$: Subscription = Subscription.EMPTY;

  constructor(private route: ActivatedRoute, private scoutService: ScoutService) {
  }

  public ngOnInit() {
    this.params$$ = this.route.params.subscribe(params => {
      this.troopId = params['troopId'];
      this.scouts$$ = this.scoutService.getScouts$(this.troopId)
        .pipe(
          first()
        ).subscribe(scouts => {
          this.scouts = scouts;
          // TODO: check if array is empty
          this.handleNextScout();
        });
    });
  }

  public ngOnDestroy(): void {
    this.scouts$$.unsubscribe();
    this.params$$.unsubscribe();
  }

  isPresent(scout: LoadedScout) {
    this.scoutService.setAttendance(this.troopId, scout, 'present');
    console.log();
  }

  private handleNextScout() {
    const scout = this.scouts
      .find(value => !this.checkedIds.has(value.id));

    if (scout === undefined) {
      // TODO: handle finish
    } else {
      this.checkedIds.add(scout.id);
      this.scout$.next(scout);
      this.status$.next({all: this.scouts.length, checked: this.checkedIds.size});
    }
  }
}
