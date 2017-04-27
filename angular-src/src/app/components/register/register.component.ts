import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(private _validateService: ValidateService,
    private _flashMessagesService: FlashMessagesService,
    private _authService: AuthService,
    private _router: Router) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    }

    // Required Fields
    if (!this._validateService.validateRegister(user)) {
      this._flashMessagesService.show("Please fill in all fields.", { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    } else if (!this._validateService.validateEmail(user.email)) {
      this._flashMessagesService.show('Please provide a valid Email.', { cssClass: 'alert-danger', timeout: 3000 });
      return false;
    } else {
      // Register user
      this._authService.registerUser(user).subscribe(data => {
        if (data.success) {
          this._flashMessagesService.show('You\'re now registered.', { cssClass: 'alert-success', timeout: 3000 });
          this._router.navigate(['/login']);
        } else {
          this._flashMessagesService.show('Something went wrong.', { cssClass: 'alert-danger', timeout: 3000 });
        }
      });
    }
  }
}
