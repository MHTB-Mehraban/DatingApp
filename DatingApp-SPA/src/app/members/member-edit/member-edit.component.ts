import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_Services/Alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/_Services/user.service';
import { AuthService } from 'src/app/_Services/Auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  @ViewChild('editForm', {static: true} ) editForm: NgForm;
  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  constructor(private route: ActivatedRoute, private alertify: AlertifyService
    , private userservice: UserService , private authservice: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    this.authservice.currenPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }
  UpdateUser() {
    this.userservice.updateUser( this.authservice.Decodedtoken.nameid , this.user ).subscribe(next => {
      this.alertify.success('profile Successfully Changed');
      this.editForm.reset(this.user);
    }, error => {
      this.alertify.error(error);
    });
  }
  UpdateMainPhoto(photoUrl) {
    this.user.photoUrl = photoUrl;
  }

}
