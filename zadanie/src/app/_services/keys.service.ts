import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KeyPair } from '../_models/key';

@Injectable({
  providedIn: 'root'
})
export class KeysService {

  private readonly API_URL: string = 'api/';

  constructor(private http: HttpClient) { }

  public getGeneratedKeys(): Observable<KeyPair> {
    return this.http.get<KeyPair>(this.API_URL + 'generatekeys');
  }

}
