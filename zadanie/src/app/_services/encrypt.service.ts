import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Key } from '../_models/key';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {

  apiUrl = 'http://localhost:9090/api/';

  constructor(private http: HttpClient) { }

  public generateKey() {
    return this.http.get(this.apiUrl + 'generatekeys');
  }

  public encrypt(data: FormData) {
    return this.http.post(this.apiUrl + 'encrypt/', data, { responseType: 'blob' });
  }

  public decrypt(data: FormData) {
    return this.http.post(this.apiUrl + 'decrypt/', data, { responseType: 'blob' });
  }

}
