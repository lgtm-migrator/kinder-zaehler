import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Observable, Subscription} from "rxjs";
import {Child} from "../../models/child.model";
import {ChildService} from "../../services/child.service";

@Component({
  selector: 'app-scout-page',
  templateUrl: './scout-page.component.html',
  styleUrls: ['./scout-page.component.scss']
})
export class ScoutPageComponent implements OnInit, OnDestroy {
  public children$: Observable<Child[]>;
  private scoutId: string = undefined;
  private params$$: Subscription;

  constructor(
    private route: ActivatedRoute,
    private childService: ChildService) {
  }

  public ngOnInit() {
    this.params$$ = this.route.params.subscribe(params => {
      this.scoutId = params['scoutId'];
      this.children$ = this.childService.getChildren$(this.scoutId);
    });
  }

  public ngOnDestroy(): void {
    this.params$$.unsubscribe();
  }

}
