import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public encrypt() {
    return this.http.post(this.apiUrl + 'encrypt/', null);
  }

  public getFile() {
    return this.http.get(this.apiUrl + 'file');
  }

  public decrypt() {
    return this.http.post(this.apiUrl + 'decrypt/', null);
  }
}
