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
    this.fileService.currentFile$.next(selectedFile);
  }

}
