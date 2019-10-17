import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { UserService } from '../../_Services/user.service';
import { AlertifyService } from '../../_Services/Alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  users: User[];
  constructor(private userservice: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.loadUsers();
    
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

  //loadUsers() {
  //  this.userservice.getusers().subscribe((users: User[]) => {
  //    this.users = users;
  //  }, error => {
  //    this.alertify.error(error);
  //  });
  //}
}
