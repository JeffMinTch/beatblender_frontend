import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UserWebService {

  private ROOT = environment.apiURL.baseUrl;
  private PROTECTED_USER = this.ROOT + environment.apiURL.userPath.protected.root;
  private GET_USER_DATA: string = this.PROTECTED_USER + environment.apiURL.userPath.protected.userData;

  constructor(
    private httpClient: HttpClient
  ) { }

  getUserData(): Observable<any> {
    return this.httpClient.get(this.GET_USER_DATA);
  }
}
