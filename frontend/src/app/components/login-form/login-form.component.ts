import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  public model: { email: string, password: string } = {email: "", password: ""};

  constructor(private auth: AuthService) {
  }

  async login() {
    await this.auth.signInWithEmailAndPassword(this.model.email, this.model.password);
  }
}
