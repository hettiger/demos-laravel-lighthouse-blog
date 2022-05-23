import { Component, OnInit } from '@angular/core';
import { MessageBag } from '../../../entities';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs';
import { LaravelValidationError } from '../../../errors/laravel-validation.error';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading = false;
  serverErrors: MessageBag = {};

  constructor(
    private authService: AuthService,
    private location: Location
  ) { }

  ngOnInit(): void {
  }

  submit(credentials: any) {
    this.isLoading = true;

    this.authService.login(credentials).pipe(
      finalize(() => this.isLoading = false),
    ).subscribe({
      next: token => {
        localStorage.setItem('token', token);
        this.location.back();
      },
      error: (error: unknown) => {
        if (error instanceof LaravelValidationError) {
          this.serverErrors = error.messageBag;
        } else {
          throw error;
        }
      },
    });
  }
}
