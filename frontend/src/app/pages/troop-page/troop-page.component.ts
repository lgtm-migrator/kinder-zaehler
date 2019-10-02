import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import {Scout} from '../../models/scout.model';
import {Troop} from '../../models/troop.model';
import {ScoutService} from '../../services/scout.service';
import {TroopService} from '../../services/troop.service';
import bulmaCalendar from 'bulma-calendar/dist/js/bulma-calendar';

@Component({
  selector: 'app-troop-page',
  templateUrl: './troop-page.component.html',
  styleUrls: ['./troop-page.component.scss']
})
export class TroopPageComponent implements OnInit, AfterViewInit, OnDestroy {
  public scouts$: Observable<Scout[]>;
  public troop$: Observable<Troop>;
  public calendar: bulmaCalendar;
  public troopId: string = undefined;

  @ViewChild('dateInput', {static: false}) dateInput: ElementRef<HTMLInputElement>;
  private params$$: Subscription = Subscription.EMPTY;

  constructor(
    private route: ActivatedRoute,
    private scoutService: ScoutService,
    private troopService: TroopService) {
  }

  public ngOnInit() {
    this.params$$ = this.route.params.subscribe(params => {
      this.troopId = params['troopId'];
      this.troop$ = this.troopService.getTroop$(this.troopId);
      this.scouts$ = this.scoutService.getScouts$(this.troopId);
    });
  }

  public ngOnDestroy(): void {
    this.params$$.unsubscribe();
  }

  createScout(scout: { name: string }) {
    this.scoutService.createScout(scout, this.troopId);
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
