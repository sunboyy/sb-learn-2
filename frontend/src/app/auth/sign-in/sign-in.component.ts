import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusService } from '../../shared/status.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  username = '';
  password = '';
  rememberMe = false;
  isLoading = false;

  message = '';

  allowRegistration = false;

  constructor(
    private authService: AuthService,
    private statusService: StatusService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.statusService.getStatus().subscribe((status) => {
      this.allowRegistration = status.allowSelfRegistration;
    });
  }

  onSignIn(): void {
    this.isLoading = true;
    this.authService.signIn(this.username, this.password, this.rememberMe).subscribe((message) => {
      this.isLoading = false;
      if (message) {
        this.message = message;
      } else {
        this.router.navigate(['']);
      }
    });
  }
}
