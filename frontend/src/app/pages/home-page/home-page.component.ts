import {ChangeDetectionStrategy, Component} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {ScoutService} from '../../services/scout.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePageComponent {
  public scouts$: Observable<{ scoutId: string, name: string, isLoading?: boolean }[]>;

  private reloadScouts$: BehaviorSubject<void> = new BehaviorSubject(undefined);
  private loadingScoutNames: Set<string> = new Set();
  private deletedScoutIds: Set<string> = new Set();

  constructor(public scoutService: ScoutService) {
    this.scouts$ = combineLatest(this.scoutService.scouts$, this.reloadScouts$).pipe(
      map(([scouts,]: [{ scoutId: string, name: string, isLoading?: boolean }[], void]) => {
        scouts.forEach(scout => {
          if (this.loadingScoutNames.has(scout.name)) {
            this.loadingScoutNames.delete(scout.name);
          }

          if (!this.deletedScoutIds.has(scout.scoutId)) {
            this.deletedScoutIds.delete(scout.scoutId);
          }
        });

        const filteredScouts = scouts
          .filter(scout => !this.deletedScoutIds.has(scout.scoutId))
          .map((scout) => {
            scout.isLoading = false;
            return scout;
          });

        const loadingScouts = this.mapLoadingScoutNamesToScouts();
        return [...filteredScouts, ...loadingScouts];
      })
    );
  }

  public joinScout(scoutId: string) {
    this.scoutService.joinScout(scoutId);
  }

  public async createScout(scoutName: string) {
    this.loadingScoutNames.add(scoutName);
    this.reloadScouts$.next(undefined);

    await this.scoutService.createScout(scoutName);
  }

  public async leaveScout(scoutId: string) {
    this.deletedScoutIds.add(scoutId);
    this.reloadScouts$.next();

    await this.scoutService.leaveScout(scoutId);
  }

  private mapLoadingScoutNamesToScouts() {
    const loadingScouts = [];
    for (let scoutName of this.loadingScoutNames) {
      loadingScouts.push({
        scoutId: undefined,
        name: scoutName,
        isLoading: true,
      });
    }
    return loadingScouts;
  }
}
