import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  // private readonly API_URL: string = 'http://localhost:8080/api/';
  private readonly API_URL: string = 'api/';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public encrypt(data: FormData) {
    const headers = { Authorization: 'Bearer ' + this.authService.getJWToken() };
    return this.http.post(this.API_URL + 'encrypt', data, { responseType: 'blob', headers });
  }

  public decrypt(data: FormData) {
    const headers = { Authorization: 'Bearer ' + this.authService.getJWToken() };
    return this.http.post(this.API_URL + 'decrypt', data, { responseType: 'blob', headers  });
  }

  public getOfflineApp() {
    const headers = { Authorization: 'Bearer ' + this.authService.getJWToken() };
    return this.http.get(this.API_URL + 'offlineapp', { responseType: 'blob', headers });
  }

}
