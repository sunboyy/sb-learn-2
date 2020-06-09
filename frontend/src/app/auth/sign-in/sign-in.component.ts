import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignIn() {
    this.authService.signIn(this.username, this.password);
    this.router.navigate(['']);
  }
}
