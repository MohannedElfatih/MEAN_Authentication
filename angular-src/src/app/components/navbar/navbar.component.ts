import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private _authService: AuthService,
    private _router: Router,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
  }

  onLogoutClick(){
    this._authService.logout();
    this._flashMessagesService.show('You are logged out', {
      cssClass: 'alert-success',
      timeout: 3000
    });
    this._router.navigate(['']);
    return false;
  }

}
