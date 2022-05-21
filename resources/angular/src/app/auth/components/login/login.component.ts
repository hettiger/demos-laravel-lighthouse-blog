import { Component, OnInit } from '@angular/core';
import { MessageBag } from '../../../entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  serverErrors: MessageBag = {};
  isLoading = false;

  constructor() { }

  ngOnInit(): void {
  }

  submit(credentials: any) {
    this.isLoading = true;

    try {
      console.log(credentials);
    } finally {
      this.isLoading = false;
    }
  }
}
