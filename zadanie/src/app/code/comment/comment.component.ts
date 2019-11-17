import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/_services/file.service';
import { Comment } from 'src/app/_models/comment.model';
import { FileMetadata } from 'src/app/_models/file-meta-data.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {

  currentFile: FileMetadata;

  constructor(private fileService: FileService) { }

  ngOnInit() {
    this.fileService.currentFile$.subscribe(
      next => {
        this.currentFile = next;
      }
    );

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
