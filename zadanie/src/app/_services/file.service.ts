import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './auth.service';
import { FileMetadata } from '../_models/file-meta-data.model';
import { Observable, BehaviorSubject } from 'rxjs';
import { Comment } from '../_models/comment.model';

interface CommentRequest {
  fileMetadataId: number;
  content: string;
  commentedBy: string;
}

@Injectable({
  providedIn: 'root'
})
export class FileService {

  // private readonly url: string = 'http://localhost:8080/api/file/';
  private readonly url = 'api/file/';
  public currentFile$: BehaviorSubject<FileMetadata> = new BehaviorSubject<FileMetadata>(Object());

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  public sendFile(data: FormData): Observable<boolean> {
    data.append('sender', sessionStorage.getItem('username'));
    const headers = {
      Authorization: 'Bearer ' + this.authService.getJWToken()
    };

    return this.http.post<boolean>(this.url + 'send', data, { headers });
  }

  public updateReceivers(receiverName: string, fileId: number) {
    const headers = {
      Authorization: 'Bearer ' + this.authService.getJWToken()
    };
    return this.http.put(this.url + 'update-receivers', { receiver: receiverName, fileId: fileId }, { headers }).subscribe(
      next => {
        console.log('succesful filesharing');
      },
      error => {
        console.log('UNsuccesful filesharing');
      }
    );
  }

  public getAllWithResctrictedDownload(): Observable<Array<FileMetadata>> {
    const username: string = sessionStorage.getItem('username');
    const headers = {
      Authorization: 'Bearer ' + this.authService.getJWToken()
    };

    return this.http.get<Array<FileMetadata>>(this.url + `getrestriced?username=${username}`, { headers });
  }

  public downloadFile(fileMetadata: FileMetadata, encrypted: boolean) {
    const headers = {
      Authorization: 'Bearer ' + this.authService.getJWToken()
    };
    if (encrypted){
      return this.http.post(this.url + 'downloadenc', fileMetadata, { responseType: 'blob', headers });
    }else{
      return this.http.post(this.url + 'download', fileMetadata, { responseType: 'blob', headers });
    }
  }

  public deleteFile(fileMetadata: FileMetadata) {
    const headers = {
      Authorization: 'Bearer ' + this.authService.getJWToken()
    };
    const options = {
      headers: headers,
      body: fileMetadata,
    };
    return this.http.delete(this.url + 'deletefile', options);
  }
  
  public updateComments(fileMetadataId: number, comment: Comment) {
    const headers = {
      Authorization: 'Bearer ' + this.authService.getJWToken()
    };
    const commentRequest: CommentRequest = {
      fileMetadataId,
      commentedBy: comment.commentedBy,
      content: comment.content
    }

    this.http.post(this.url + 'update-comments', commentRequest, { responseType: 'text', headers }).subscribe(
      successful => {
        console.log('comments successfuly updated');
      },
      error => {
        // TODO: log error
      }
    );
  }

}
