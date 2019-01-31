import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnDestroy {
  private authState$$: Subscription;

  constructor(private auth: AuthService, private router: Router) {
    this.authState$$ = this.auth.user$.subscribe((user) => {
      if (user !== null) {
        console.log("login as user: ", user.email);
        router.navigate(['/'])
      }
    })
  }

  async onGoogleSingInClick() {
    await this.auth.signInWithGoogle()
  }

  ngOnDestroy(): void {
    this.authState$$.unsubscribe();
  }
}
