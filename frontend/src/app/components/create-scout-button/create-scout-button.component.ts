import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Component, EventEmitter, Injector, OnInit, Output} from '@angular/core';
import {merge} from 'rxjs';
import {CreateScoutDialogComponent} from '../create-scout-dialog/create-scout-dialog.component';

@Component({
  selector: 'app-create-scout-button',
  templateUrl: './create-scout-button.component.html',
  styleUrls: ['./create-scout-button.component.scss']
})
export class CreateScoutButtonComponent implements OnInit {
  @Output() public createScout = new EventEmitter<{ name: string }>();


  constructor(private overlay: Overlay, private injector: Injector) {

  }

  public openCreateScoutDialog(): void {
    const overlayRef = this.overlay.create();

    const injectionTokens = new WeakMap();
    injectionTokens.set(OverlayRef, overlayRef);

    const userProfilePortal = new ComponentPortal(CreateScoutDialogComponent);
    userProfilePortal.injector = new PortalInjector(this.injector, injectionTokens);

    const componentRef = overlayRef.attach(userProfilePortal);
    const instance = componentRef.instance;


    const subscription$$ = merge(instance.close, instance.create).subscribe((value) => {
      if (value) {
        this.createScout.emit(value);
      }
      overlayRef.detach();
      subscription$$.unsubscribe();
    });
  }

  public ngOnInit(): void {
  }

}
