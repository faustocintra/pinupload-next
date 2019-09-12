import { Component, OnInit } from '@angular/core';
import { PinterestService } from '../services/pinterest.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private pinterest: PinterestService
  ) { }

  ngOnInit() {
    
  }

  initLogin() {
    this.pinterest.initLogin();
  }
 

}
