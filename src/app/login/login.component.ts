import { Component, OnInit } from '@angular/core';
import { PinterestService } from '../services/pinterest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../environments/environment';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private pinterest: PinterestService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  token : any = '';

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if(params.code) {
          console.log('Access code:');
          console.log(params.code);
          this.pinterest.accessCode = params.code;
        }
        else {
          this.doLogin();
        }
      }
    )

  }

  doLogin() {
    const env = environment;
    
    const baseUrl : string = 'https://api.pinterest.com/oauth/?';
    const params = new HttpParams()
      .set('response_type', 'code')
      .set('client_id', env.clientId)
      .set('scope', 'read_public,write_public')
      .set('redirect_uri', 'https://faustocintra.github.io/pinupload/login');

    //this.router.navigate([baseUrl], { queryParams: params});
    window.location.href = baseUrl + params.toString();   
  }

}
