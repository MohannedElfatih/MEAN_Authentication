import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username: String;
  password: String;

  constructor(private _authService: AuthService,
    private _router: Router,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    }

    this._authService.authenticateUser(user).subscribe(data => {
      if (data.success) {
        this._authService.storeUserData(data.token, data.user);
        this._flashMessagesService.show('You\'re now logged in.', { cssClass: 'alert-success', timeout: 3000 });
        this._router.navigate(['profile']);
      } else {
        this._flashMessagesService.show(data.msg, { cssClass: 'alert-danger', timeout: 4500 });
        this._router.navigate(['login']);
      }
    });
  }
}
