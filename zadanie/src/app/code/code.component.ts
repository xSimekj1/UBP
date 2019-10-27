import { Component, OnInit } from '@angular/core';
import { EncryptService } from '../_services/encrypt.service';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  loading: boolean;

  constructor(public cryptingService: EncryptService) { }

  ngOnInit() {
    this.loading = false;
  }

  callApi() {
    this.cryptingService.getFile().subscribe(Response => {
      console.log(Response);
    });
  }

}
