import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_Services/Auth.service';
import { AlertifyService } from '../_Services/Alertify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor( public authservice: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }
    login() {
    return this.authservice.login(this.model).subscribe( next => {
        this.alertify.success('Logged in Successfully');
      }, error => {
        this.alertify.error(error.error.title);
      }, () => {
        this.router.navigate(['members']);
      });
    }

    loggedIn() {
      return this.authservice.loggedIn();
    }

    logout() {
      localStorage.removeItem('token');
      this.alertify.message('logged out');
      this.router.navigate(['home']);
    }


}
