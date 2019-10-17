import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_Services/user.service';
import { AlertifyService } from '../_Services/Alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberListResolver implements Resolve<User[]>
{
    constructor(private userservice: UserService, private alertify: AlertifyService, private router: Router ) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userservice.getusers().pipe(
            catchError( error => {
                this.alertify.error(error);
                this.router.navigate(['home']);
                return of(null);

            })
        )
    }
}