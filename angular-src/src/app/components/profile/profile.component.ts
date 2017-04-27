import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: Object;
  constructor(private _authService: AuthService,
    private _router: Router,
    private _flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this._authService.getProfile().subscribe(profile =>{
      this.user = profile.user;
    }, err => {
      console.log(err);
      return false;
    });
  }
}