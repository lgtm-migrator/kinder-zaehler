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
  private email = "";
  private password = "";
  private passwordRepeat = "";

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

  async login() {
    await this.auth.signInWithEmailAndPassword(this.email, this.password);
  }

  async register() {
    await this.auth.signUpWithEmailAndPassword(this.email, this.password);
  }

  ngOnDestroy(): void {
    this.authState$$.unsubscribe();
  }
}
