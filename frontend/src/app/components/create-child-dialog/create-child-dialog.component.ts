import {OverlayRef} from "@angular/cdk/overlay";
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-child-dialog',
  templateUrl: './create-child-dialog.component.html',
  styleUrls: ['./create-child-dialog.component.scss']
})
export class CreateChildDialogComponent implements OnInit {

  constructor(private overlayRef: OverlayRef) { }

  ngOnInit() {
  }

}
