import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/_services/file.service';
import { FileMetadata } from 'src/app/_models/file-meta-data.model';
import { Comment } from 'src/app/_models/comment.model';

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss']
})
export class FileManagementComponent implements OnInit {

  public filesData: Array<FileMetadata>;
  currentFile: FileMetadata;

  constructor(private fileService: FileService) {
    this.filesData = new Array<FileMetadata>();
  }

  ngOnInit() {
    this.getFiles();
  }

  getFiles() {
    this.fileService.getAllWithResctrictedDownload().subscribe(
      filemetadata => {
        this.filesData = filemetadata;
        console.log(filemetadata);
      },
      error => {
        // TODO: log error
        console.log(error);
      }
    );
  }

  downloadFile(fileMetadata: FileMetadata) {
    this.fileService.downloadFile(fileMetadata).subscribe(
      file => {
        const blob = new Blob([file]);
        saveAs(blob, fileMetadata.filename);
      }
    );
  }

  setCurrentFile(selectedFile: FileMetadata) {
    this.currentFile = selectedFile;
  }

  addComment(commentContent: string) {
    const comment: Comment = {
      content: commentContent,
      commentedBy: sessionStorage.getItem('username')
    }
    this.currentFile.comments.push(comment);
    this.fileService.updateComments(this.currentFile.id, comment);
  }

  isCurrentUserSender(): boolean {
    return sessionStorage.getItem('username') === this.currentFile.senderUsername;
  }

  updateReceivers(receiverName: string) {
    this.fileService.updateReceivers(receiverName, this.currentFile.id);
  }

}
