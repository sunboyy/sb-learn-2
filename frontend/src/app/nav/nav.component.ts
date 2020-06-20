import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userAuthority = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.userService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.userAuthority = user.authority;
      } else {
        this.userAuthority = '';
      }
    });
  }

  get isSignedIn(): boolean {
    return this.authService.isSignedIn;
  }

  onSignOut() {
    this.authService.signOut();
    this.router.navigate(['auth', 'sign-in']);
  }
}
