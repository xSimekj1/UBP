import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  private readonly API_URL: string = 'api/';

  constructor(private http: HttpClient) { }

  public encrypt(data: FormData) {
    return this.http.post(this.API_URL + 'encrypt/', data, { responseType: 'blob' });
  }

  public decrypt(data: FormData) {
    return this.http.post(this.API_URL + 'decrypt/', data, { responseType: 'blob' });
  }

  public getOfflineApp() {
    return this.http.get(this.API_URL + 'offlineapp/', { responseType: 'blob' });
  }

}
