import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  values: any;
  registermode = false;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.GetValues();
  }

  registertoggle() {
    this.registermode = !this.registermode;
  }

  GetValues() {
    this.http.get('http://localhost:5000/api/values').subscribe(
    Response => {
      this.values = Response;
    } , error => {
      console.log(error);
    }
    );

  }

  CancelRegisterMode(registermode: boolean) {
    this.registermode = registermode;
  }
}
