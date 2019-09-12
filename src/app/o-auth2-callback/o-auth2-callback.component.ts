import { Component, OnInit } from '@angular/core';
import { PinterestService } from '../services/pinterest.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-o-auth2-callback',
  templateUrl: './o-auth2-callback.component.html',
  styleUrls: ['./o-auth2-callback.component.scss']
})
export class OAuth2CallbackComponent implements OnInit {

  constructor(
    private pinterest: PinterestService,
    private router : Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if(params.code) {
          console.log('Access code:');
          console.log(params.code);
          this.pinterest.setAccessCode(params.code);
          //this.router.navigate(['/']);
        }
        else {
          console.error('ERRO DE ACCESS CODE');
        }
      }
    );    
  }

}
