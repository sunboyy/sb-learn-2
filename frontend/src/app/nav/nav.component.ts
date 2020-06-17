import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  constructor(private authService: AuthService, private router: Router) {}

  get isSignedIn(): boolean {
    return this.authService.isSignedIn;
  }

  onClickRecallcardLearn() {
    this.router.navigate(['recallcard', 'learn']);
  }

  onClickRecallcardManage() {
    this.router.navigate(['recallcard', 'manage']);
  }

  onSettings() {
    this.router.navigate(['settings']);
  }

  onSignOut() {
    this.authService.signOut();
    this.router.navigate(['auth', 'sign-in']);
  }
}
