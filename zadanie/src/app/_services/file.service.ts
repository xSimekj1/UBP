import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './auth.service';
import { FileMetadata } from '../_models/file-meta-data.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private readonly url = 'api/';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public sendFile(data: FormData) {
    data.append('sender', sessionStorage.getItem('username'));
    const headers = {
      Authorization: 'Bearer ' + this.authService.getJWToken()
    };

    return this.http.post<boolean>(this.url + 'sendfile', data, { headers });
  }

  public getFilesByUsername(): Observable<Array<FileMetadata>> {
    const username: string = sessionStorage.getItem('username');
    const headers = {
      Authorization: 'Bearer ' + this.authService.getJWToken()
    };

    return this.http.get<Array<FileMetadata>>(this.url + `getfiles?username=${username}`, { headers });
  }

  // ?filepath=${filename}`
  public downloadFile(fileMetadata: FileMetadata) {
    const headers = {
      Authorization: 'Bearer ' + this.authService.getJWToken()
    };

    return this.http.post(this.url + 'downloadfile', fileMetadata, { responseType: 'blob', headers });
  }

}
