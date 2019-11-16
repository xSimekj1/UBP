import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/_services/file.service';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public receiver = '';

  message: string;
  isSendingFileSuccessful: boolean;
  file: File;

  constructor(private fileService: FileService) { }

  ngOnInit() {
  }

  loadFile(file: File) {
    this.file = file;
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
