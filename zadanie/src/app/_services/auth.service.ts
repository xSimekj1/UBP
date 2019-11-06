import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  TOKEN_NAME = 'accessToken'

  public username: String;
  public password: String;

  constructor(private http: HttpClient) {

  }

  authenticationService(username: String, password: String) {
    let data =  {
      "username": username,
      "password" : password
    };
    return this.http.post('http://localhost:8080/api/auth/signin', data, { responseType: 'json' });
  }

  authenticationServiceRegister(username: String, password: String) {
    let data =  {
      "username": username,
      "password" : password
    };
    return this.http.post('http://localhost:8080/api/auth/signup', data, { responseType: 'json' });
  }

  logout() {
    sessionStorage.removeItem(this.TOKEN_NAME);
    this.username = null;
    this.password = null;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.TOKEN_NAME)
    if (user === null) return false
    return true
  }

  
}