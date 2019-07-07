import {ChangeDetectionStrategy, Component} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
  public model: { email: string, password: string, passwordRepeat: string } = {
    email: '',
    password: '',
    passwordRepeat: ''
  };
  public passwordDoNotMatch = false;

  constructor(private auth: AuthService) {
  }

  public async register() {
    this.passwordDoNotMatch = this.model.password !== this.model.passwordRepeat;
    if (this.passwordDoNotMatch) {
      return;
    }
    await this.auth.signUpWithEmailAndPassword(this.model.email, this.model.password);
  }
}
