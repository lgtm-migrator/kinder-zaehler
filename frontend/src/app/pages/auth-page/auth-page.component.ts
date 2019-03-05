import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthPageComponent implements OnDestroy {
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
