import {Overlay, OverlayRef} from "@angular/cdk/overlay";
import {ComponentPortal, PortalInjector} from "@angular/cdk/portal";
import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {CreateChildDialogComponent} from "../create-child-dialog/create-child-dialog.component";

@Component({
  selector: 'app-create-child-button',
  templateUrl: './create-child-button.component.html',
  styleUrls: ['./create-child-button.component.scss']
})
export class CreateChildButtonComponent implements OnInit {
  @Output() public createChild = new EventEmitter<{ name: string }>();


  constructor(private overlay: Overlay, private injector: Injector) {

  }

  public openCreateChildDialog(): void {
    const overlayRef = this.overlay.create();

    const injectionTokens = new WeakMap();
    injectionTokens.set(OverlayRef, overlayRef);

    const userProfilePortal = new ComponentPortal(CreateChildDialogComponent);
    userProfilePortal.injector = new PortalInjector(this.injector, injectionTokens);

    const componentRef = overlayRef.attach(userProfilePortal);

    const subscription$$ = componentRef.instance.close.subscribe(() => {
      overlayRef.detach();
      subscription$$.unsubscribe();
    })
  }

  public ngOnInit(): void {
  }

}
