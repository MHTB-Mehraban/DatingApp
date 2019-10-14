import { Component, OnInit } from '@angular/core';
import { AuthService } from './_Services/Auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private authservice: AuthService){}
  title = 'DatingApp-SPA';
  jwtHelper = new JwtHelperService();

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authservice.Decodedtoken = this.jwtHelper.decodeToken(token);
    }
  }
}
