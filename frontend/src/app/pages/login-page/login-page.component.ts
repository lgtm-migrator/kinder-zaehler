import {Component, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
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
