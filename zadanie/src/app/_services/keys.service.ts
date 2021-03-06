import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeyPair } from '../_models/key';

@Injectable({
  providedIn: 'root'
})
export class KeysService {

  // private readonly API_URL: string = 'http://localhost:8080/';
  private readonly TOKEN_NAME = 'accessToken';

  constructor(private http: HttpClient) { }

  public getKeys(isNewKeys: boolean): Observable<KeyPair> {
    const headers = {
      Authorization: 'Bearer ' + this.getJWToken()
    };
    const url: string = isNewKeys ? 'generatekeys' : 'getkeys';

    return this.http.get<KeyPair>('api/' + url, { headers });
  }

  getJWToken() {
    const token = sessionStorage.getItem(this.TOKEN_NAME);
    if (token === null) {
      return '';
    }
    return token;
  }
}
