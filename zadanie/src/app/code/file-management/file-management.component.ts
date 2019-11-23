import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/_services/file.service';
import { FileMetadata } from 'src/app/_models/file-meta-data.model';

@Component({
  selector: 'app-file-management',
  templateUrl: './file-management.component.html',
  styleUrls: ['./file-management.component.scss']
})
export class FileManagementComponent implements OnInit {

  public filesData: Array<FileMetadata>;
  public adminUser = false;

  constructor(private fileService: FileService) {
    this.filesData = new Array<FileMetadata>();
  }

  ngOnInit() {
    this.getFiles();
    this.isUserAdmin();
  }

  getFiles() {
    this.fileService.getAllWithResctrictedDownload().subscribe(
      filemetadata => {
        this.filesData = filemetadata;
      },
      error => {
        // TODO: log error
        console.log(error);
      }
    );
  }

  downloadFile(fileMetadata: FileMetadata) {
    this.fileService.downloadFile(fileMetadata, false).subscribe(
      file => {
        const blob = new Blob([file]);
        saveAs(blob, fileMetadata.filename);
      },
      err => {
        alert("Error! The file was probably encrypted with your old public key." +
        " The file will be downloaded encrypted, so you can" +
        " decode it locally if you have stored your old private key. If not, ask for resend in comments.");
        this.fileService.downloadFile(fileMetadata, true).subscribe(
          file => {
            const blob = new Blob([file]);
            saveAs(blob, fileMetadata.filename);
          },
          err => {
            alert("Error!");
          })
      } 
    );
  }

  isUserAdmin(){
    this.adminUser = ("true" == sessionStorage.getItem('admin'));
  }

  deleteFile(fileMetadata: FileMetadata) {
    this.fileService.deleteFile(fileMetadata).subscribe(
      (data) =>{
        console.log("File deleted");
        this.ngOnInit();
      }),
      err => {
        console.log("Error");
      }   
  }

  setCurrentFile(selectedFile: FileMetadata) {
    this.fileService.currentFile$.next(selectedFile);
  }

}
