import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-create-child-form',
  templateUrl: './create-child-form.component.html',
  styleUrls: ['./create-child-form.component.scss']
})
export class CreateChildFormComponent {
  @Output() public createChild = new EventEmitter<{ name: string }>();

  public openCreateChildDialog(): void {

  }
}
