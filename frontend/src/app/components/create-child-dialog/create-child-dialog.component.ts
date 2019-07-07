import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-create-child-dialog',
  templateUrl: './create-child-dialog.component.html',
  styleUrls: ['./create-child-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateChildDialogComponent {
  public close = new Subject<void>();
  public create = new Subject<{ name: string }>();

  public name = '';
  public childNameEmpty = false;

  constructor() {
  }

  public onSubmit() {
    this.name = this.name.trim();
    if (this.name.length < 1) {
      this.childNameEmpty = true;
      return;
    }
    this.create.next({name: this.name});
    this.childNameEmpty = false;
  }
}
