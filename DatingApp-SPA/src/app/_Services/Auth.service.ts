import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient ) { }
  baseurl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  Decodedtoken: any;
  currentUser: User;
  photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  currenPhotoUrl = this.photoUrl.asObservable();

  changeMemberPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) { 
    return this.http.post(this.baseurl + 'login', model ).pipe(
      map((Response: any) => {
        const user = Response;
        if (user) {
          localStorage.setItem('token', user.token);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.Decodedtoken = this.jwtHelper.decodeToken(user.token);
          this.currentUser = user.user ;
          this.changeMemberPhoto(this.currentUser.photoUrl);
        }
      }
    ));

  }

  register(user: User) {
    return this.http.post(this.baseurl + 'register', user );
  }

    loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}
