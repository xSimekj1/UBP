import { Component, OnInit } from '@angular/core';
import { FileService } from '../_services/file.service';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  showComments = false;

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.fileService.currentFile$.subscribe(
      next => {
        this.showComments = true;
      }
    )
  }

}
