import {OverlayRef} from "@angular/cdk/overlay";
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Subject} from "rxjs";

@Component({
  selector: 'app-create-child-dialog',
  templateUrl: './create-child-dialog.component.html',
  styleUrls: ['./create-child-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateChildDialogComponent implements OnInit {
  public close = new Subject<void>();


  constructor(private overlayRef: OverlayRef) {
  }

  ngOnInit() {
  }

}
