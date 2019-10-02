import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChildService} from '../../services/child.service';
import {Subject, Subscription} from 'rxjs';
import {first} from 'rxjs/operators';
import {LoadedChild} from '../../models/loaded-child.model';

@Component({
  selector: 'app-attendance-check-page',
  templateUrl: './attendance-check-page.component.html',
  styleUrls: ['./attendance-check-page.component.scss']
})
export class AttendanceCheckPageComponent implements OnInit, OnDestroy {
  public child$: Subject<LoadedChild> = new Subject();
  public status$: Subject<{ checked: number, all: number }> = new Subject();

  private children: LoadedChild[] | null = null;
  private troopId: string = undefined;
  private checkedIds: Set<string> = new Set();

  private children$$: Subscription = Subscription.EMPTY;
  private params$$: Subscription = Subscription.EMPTY;

  constructor(private route: ActivatedRoute, private childService: ChildService) {
  }

  public ngOnInit() {
    this.params$$ = this.route.params.subscribe(params => {
      this.troopId = params['troopId'];
      this.children$$ = this.childService.getChildren$(this.troopId)
        .pipe(
          first()
        ).subscribe(children => {
          this.children = children;
          // TODO: check if array is empty
          this.handleNextChild();
        });
    });
  }

  public ngOnDestroy(): void {
    this.children$$.unsubscribe();
    this.params$$.unsubscribe();
  }

  isPresent(child: LoadedChild) {
    this.childService.setAttendance(this.troopId, child, 'present');
    console.log();
  }

  private handleNextChild() {
    const child = this.children
      .find(value => !this.checkedIds.has(value.id));

    if (child === undefined) {
      // TODO: handle finish
    } else {
      this.checkedIds.add(child.id);
      this.child$.next(child);
      this.status$.next({all: this.children.length, checked: this.checkedIds.size});
    }
  }
}
