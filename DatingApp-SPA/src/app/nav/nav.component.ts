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
  photoUrl: string;

  constructor( public authservice: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
    this.authservice.currenPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
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
      localStorage.removeItem('user');
      this.authservice.Decodedtoken = null;
      this.authservice.currentUser = null;
      this.alertify.message('logged out');
      this.router.navigate(['home']);
    }


}
