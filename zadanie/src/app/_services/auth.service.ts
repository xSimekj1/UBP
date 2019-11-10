import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface ApiResponse {
  success: boolean;
  message: string;
}

interface Credentials {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  // BASE_PATH: 'http://localhost:8080'
  // private readonly url = 'http://localhost:8080/';
  private readonly url = 'api/auth/';
  private readonly TOKEN_NAME = 'accessToken';

  public username: string;
  public password: string;

  constructor(private http: HttpClient) { }

  authenticationService(username: string, password: string) {
    const credentials: Credentials =  {
      username,
      password
    };

    return this.http.post(this.url + 'signin', credentials, { responseType: 'json' });
  }

  registerUser(username: string, password: string) {
    const credentials: Credentials =  {
      username,
      password
    };

    return this.http.post<ApiResponse>(this.url + 'signup', credentials, { responseType: 'json' });
  }

  // change path later
  public checkPasswordStrength(password: string) {
    return this.http.post<boolean>(this.url + 'pass-strength', { password });
  }

  // change path later
  public sendFile(password: string) {
    return this.http.post<boolean>(this.url + 'sendfile', {password});
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

  public getJWToken() {
    const token = sessionStorage.getItem(this.TOKEN_NAME);
    if (token === null) {
      return '';
    }
    return token;
  }

}
