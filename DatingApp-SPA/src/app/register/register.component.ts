import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_Services/Auth.service';
import { AlertifyService } from '../_Services/Alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() ValuesFromHome: any;
  @Output() cancelregister  = new EventEmitter();
  model: any = {};
  constructor(private authservice: AuthService , private alertify: AlertifyService) { }
  ngOnInit() {
  }

  register() {
   this.authservice.register(this.model).subscribe(() => {
    this.alertify.success('registered successfully');
   }, error => {
    this.alertify.error(error.error.title);
   }
   );
  }

  cancel() {
    this.cancelregister.emit(false);
    console.log('canceled');
  }
}
