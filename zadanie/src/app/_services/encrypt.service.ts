import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  private readonly API_URL: string = 'http://localhost:8080/api/';
  private TOKEN_NAME = 'accessToken'

  constructor(private http: HttpClient) { }

  public encrypt(data: FormData) {
    let headers = { Authorization: "Bearer "+this.getJWToken() } 
    return this.http.post(this.API_URL + 'encrypt', data, { responseType: 'blob',headers: headers });
  }

  public decrypt(data: FormData) {
    let headers = { Authorization: "Bearer "+this.getJWToken() } 
    return this.http.post(this.API_URL + 'decrypt', data, { responseType: 'blob',headers: headers  });
  }

  public getOfflineApp() {
    let headers = { Authorization: "Bearer "+this.getJWToken() } 
    return this.http.get(this.API_URL + 'offlineapp', { responseType: 'blob' ,headers: headers });
  }

  getJWToken() {
    let token = sessionStorage.getItem(this.TOKEN_NAME)
    if (token === null) return ''
    return token
  }
}
