import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-create-scout-dialog',
  templateUrl: './create-scout-dialog.component.html',
  styleUrls: ['./create-scout-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateScoutDialogComponent {
  public close = new Subject<void>();
  public create = new Subject<{ name: string }>();

  public name = '';
  public scoutNameEmpty = false;

  constructor() {
  }

  public onSubmit() {
    this.name = this.name.trim();
    if (this.name.length < 1) {
      this.scoutNameEmpty = true;
      return;
    }
    this.create.next({name: this.name});
    this.scoutNameEmpty = false;
  }
}
