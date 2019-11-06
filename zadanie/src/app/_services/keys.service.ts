import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeyPair } from '../_models/key';

@Injectable({
  providedIn: 'root'
})
export class KeysService {

  private readonly API_URL: string = 'http://localhost:8080/api/';
  private TOKEN_NAME = 'accessToken'

  constructor(private http: HttpClient) { }

  public getGeneratedKeys(): Observable<KeyPair> {    
    let headers = { Authorization: "Bearer "+this.getJWToken() } 
    return this.http.get<KeyPair>(this.API_URL + 'generatekeys',  { headers: headers });
  }

  public getKeys(): Observable<KeyPair> {    
    let headers = { Authorization: "Bearer "+this.getJWToken() } 
    return this.http.get<KeyPair>(this.API_URL + 'getkeys',  { headers: headers });
  }

  getJWToken() {
    let token = sessionStorage.getItem(this.TOKEN_NAME)
    if (token === null) return ''
    return token
  }
}
