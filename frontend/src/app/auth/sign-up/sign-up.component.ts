import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusService } from '../../shared/status.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  username = '';
  password = '';
  confirmPassword = '';

  message = '';

  constructor(
    private authService: AuthService,
    private statusService: StatusService,
    private router: Router
  ) {}

  ngOnInit() {
    this.statusService.getStatus().subscribe((status) => {
      if (!status.allowSelfRegistration) {
        this.router.navigate(['auth', 'sign-in']);
      }
    });
  }

  onSignUp() {
    if (this.username === '') {
      this.message = 'Username must not be empty';
      return;
    }
    if (this.password.length < 6) {
      this.message = 'Password must be at least 6 characters long.';
      return;
    }
    if (this.password !== this.confirmPassword) {
      this.message = 'Confirm password does not match.';
      return;
    }
    this.authService.register(this.username, this.password).subscribe((res) => {
      if (res.success) {
        this.statusService.updateStatus();
        this.router.navigate(['auth', 'sign-in']);
      } else {
        this.message = res.cause;
      }
    });
  }
}
