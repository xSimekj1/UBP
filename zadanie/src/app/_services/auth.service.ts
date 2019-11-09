import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Credentials {
  username;
  password;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  // private readonly url = 'http://localhost:8080/';
  TOKEN_NAME = 'accessToken';

  public username: string;
  public password: string;

  constructor(private http: HttpClient) { }

  authenticationService(username: string, password: string) {
    const credentials: Credentials =  {
      username,
      password
    };
    // this.url +
    return this.http.post('api/auth/signin', credentials, { responseType: 'json' });
  }

  authenticationServiceRegister(username: string, password: string) {
    const credentials: Credentials =  {
      username,
      password
    };
    // this.url +
    return this.http.post('api/auth/signup', credentials, { responseType: 'json' });
  }

  logout() {
    sessionStorage.removeItem(this.TOKEN_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.TOKEN_NAME);
    if (user === null) {
      return false;
    }
    return true;
  }

}
