import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { OAuthService, AuthConfig, JwksValidationHandler } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class PinterestService {

  private env = environment;

  public accessCode : String;

  private authConfig: AuthConfig = {
    issuer: this.env.authUrl,
    redirectUri: window.location.origin + '/index.html',
    clientId: this.env.clientId,
    scope: 'read_public,write_public',    
  };

  constructor(
    private http: HttpClient,
    private oAuthSrv: OAuthService
  ) { }

  private configure() {
    this.oAuthSrv.configure(this.authConfig);
    this.oAuthSrv.tokenValidationHandler = new JwksValidationHandler();
    //this.oAuthSrv.loadDiscoveryDocumentAndTryLogin();    
  }

  getAccessCode() {

    const baseUrl = 'https://api.pinterest.com/oauth/';
    const params = new HttpParams()
      .set('response_type', 'code')
      .set('client_id', this.env.clientId)
      .set('scope', 'read_public,write_public')
      .set('redirect_uri', 'https://faustocintra.github.io/pinupload/login');

      return this.http.get(baseUrl, {params});
      
  }

}
