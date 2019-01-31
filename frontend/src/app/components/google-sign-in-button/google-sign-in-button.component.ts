import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-google-sign-in-button',
  templateUrl: './google-sign-in-button.component.html',
  styleUrls: ['./google-sign-in-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoogleSignInButtonComponent {
}
