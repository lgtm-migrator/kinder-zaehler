import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Child} from '../../models/child.model';
import {Scout} from '../../models/scout.model';
import {ChildService} from '../../services/child.service';
import {ScoutService} from '../../services/scout.service';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar';

@Component({
  selector: 'app-scout-page',
  templateUrl: './scout-page.component.html',
  styleUrls: ['./scout-page.component.scss']
})
export class ScoutPageComponent implements OnInit, AfterViewInit, OnDestroy {
  public children$: Observable<Child[]>;
  public scout$: Observable<Scout>;
  public calendar: bulmaCalendar;
  private scoutId: string = undefined;
  private params$$: Subscription;

  @ViewChild('dateInput', {static: false}) dateInput: ElementRef<HTMLInputElement>;

  constructor(
    private route: ActivatedRoute,
    private childService: ChildService,
    private scoutService: ScoutService) {
  }

  public ngOnInit() {
    this.params$$ = this.route.params.subscribe(params => {
      this.scoutId = params['scoutId'];
      this.scout$ = this.scoutService.getScout$(this.scoutId);
      this.children$ = this.childService.getChildren$(this.scoutId);
    });
  }

  public ngOnDestroy(): void {
    this.params$$.unsubscribe();
  }

  createChild(child: { name: string }) {
    this.childService.createChild(child, this.scoutId);
  }

  ngAfterViewInit(): void {
    this.calendar = bulmaCalendar.attach('[type="date"]', {
      type: 'date',
      dateFormat: 'DD/MM/YYYY',
      startDate: new Date(),
      showClearButton: false
    })[0];
  }
}
