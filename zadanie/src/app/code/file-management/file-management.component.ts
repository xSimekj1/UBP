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
  public receiver = '';

  isSendingFileSuccessful: boolean;
  message: string;
  file: File;

  constructor(private fileService: FileService) {
    this.filesData = new Array<FileMetadata>();
  }

  ngOnInit() {
    this.getFiles();
  }

  loadFile(file: File) {
    this.file = file;
  }

  getFiles() {
    this.fileService.getFilesByUsername().subscribe(
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

  sendFile() {
    const formData: FormData = new FormData();
    formData.append('file', this.file, this.file.name);
    formData.append('receiver', this.receiver);

    this.fileService.sendFile(formData).subscribe(
      isSuccessful => {
        this.isSendingFileSuccessful = isSuccessful;
        if (this.isSendingFileSuccessful) {
          this.message = 'Súbor bol úspešne odoslaný';
        } else {
          this.message = 'Zadaný užívateľ neexistuje.';
        }
      },
      error => {
        console.log('sending file was UNSUCCESSFUL.');
      }
    );
  }

}
