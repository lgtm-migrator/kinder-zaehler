import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ChildService} from '../../services/child.service';
import {Subscription} from 'rxjs';
import {Child} from '../../models/child.model';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-attendance-check-page',
  templateUrl: './attendance-check-page.component.html',
  styleUrls: ['./attendance-check-page.component.scss'],
})
export class AttendanceCheckPageComponent implements OnInit, OnDestroy {
  public children: Child[] | null = null;
  private scoutId: string = undefined;

  private children$$: Subscription = Subscription.EMPTY;
  private params$$: Subscription = Subscription.EMPTY;

  constructor(private route: ActivatedRoute, private childService: ChildService) {
  }

  public ngOnInit() {
    this.params$$ = this.route.params.subscribe(params => {
      this.scoutId = params['scoutId'];
      this.children$$ = this.childService.getChildren$(this.scoutId)
        .pipe(
          first()
        ).subscribe(children => {
          console.log('got chldren attendacnce', children, this);
          this.children = children;
        });
    });
  }

  public ngOnDestroy(): void {
    this.children$$.unsubscribe();
    this.params$$.unsubscribe();
  }

  asdfasdf(children: Child[]) {
    console.log(children)
  }
}
