import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-scout-page',
  templateUrl: './scout-page.component.html',
  styleUrls: ['./scout-page.component.scss']
})
export class ScoutPageComponent implements OnInit, OnDestroy {
  private scoutId: string = undefined;
  private params$$: Subscription;

  constructor(private route: ActivatedRoute) {
  }

  public ngOnInit() {
    this.params$$ = this.route.params.subscribe(params => {
      this.scoutId = params['scoutId'];
      console.log("scoutId: ", this.scoutId)
    });
  }

  public ngOnDestroy(): void {
    this.params$$.unsubscribe();
  }

}
