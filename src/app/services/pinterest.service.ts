import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PinterestService {

  private env = environment;

  private accessCode : string;
  private accessToken: string;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  initLogin() {

    const baseUrl : string = 'https://api.pinterest.com/oauth/?';
    const params = new HttpParams()
      .set('response_type', 'code')
      .set('client_id', this.env.clientId)
      .set('scope', 'read_public,write_public')
      .set('redirect_uri', 'https://faustocintra.github.io/pinupload/oauth2/callback');

    window.location.href = baseUrl + params.toString();
        
  }

  setAccessCode(accessCode: string) {
    this.accessCode = accessCode;
    this.getAccessToken();
  }

  private getAccessToken() {
    const baseUrl = 'https://api.pinterest.com/v1/oauth/token?';
    const params = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('client_id', this.env.clientId)
      .set('client_secret', this.env.clientSecret)
      .set('code', this.accessCode);

    this.http.post(baseUrl, null, {params: params}).subscribe(
      res => {
        console.log('--TOKEN--');
        this.accessToken = res['access_token'];
        console.log(this.accessToken);
        //this.router.navigate(['/']);
      },
      error => {
        console.error('ERRO DE TOKEN');
        console.error(error);
        //this.router.navigate(['/login']);
      }
    );

  }

}
