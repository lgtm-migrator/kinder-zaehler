import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Child} from '../../models/child.model';
import {Troop} from '../../models/troop.model';
import {ChildService} from '../../services/child.service';
import {TroopService} from '../../services/troop.service';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar';

@Component({
  selector: 'app-troop-page',
  templateUrl: './troop-page.component.html',
  styleUrls: ['./troop-page.component.scss']
})
export class TroopPageComponent implements OnInit, AfterViewInit, OnDestroy {
  public children$: Observable<Child[]>;
  public troop$: Observable<Troop>;
  public calendar: bulmaCalendar;

  @ViewChild('dateInput', {static: false}) dateInput: ElementRef<HTMLInputElement>;
  private troopId: string = undefined;
  private params$$: Subscription = Subscription.EMPTY;

  constructor(
    private route: ActivatedRoute,
    private childService: ChildService,
    private troopService: TroopService) {
  }

  public ngOnInit() {
    this.params$$ = this.route.params.subscribe(params => {
      this.troopId = params['troopId'];
      this.troop$ = this.troopService.getTroop$(this.troopId);
      this.children$ = this.childService.getChildren$(this.troopId);
    });
  }

  public ngOnDestroy(): void {
    this.params$$.unsubscribe();
  }

  createChild(child: { name: string }) {
    this.childService.createChild(child, this.troopId);
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
