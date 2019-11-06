import { Component, OnInit } from '@angular/core';
import { KeysService } from 'src/app/_services/keys.service';
import { KeyPair } from 'src/app/_models/key';

@Component({
  selector: 'app-keys',
  templateUrl: './keys.component.html',
  styleUrls: ['./keys.component.scss']
})
export class KeysComponent implements OnInit {

  public keyPair: KeyPair;

  constructor(private keysService: KeysService) {
    this.keyPair = new KeyPair();
  }

  ngOnInit() {
  }

  public generateKeys() {
    this.keysService.getGeneratedKeys().subscribe(
      keys => {
        this.keyPair.privateK = keys.privateK;
        this.keyPair.publicK = keys.publicK;
        console.log(keys);
        console.log(this.keyPair.publicK, ' ', this.keyPair.privateK);
      },
      error => {
        alert('Nastala chyba');
        // TODO: log error
      }
    );
  }

  public getKeys() {
    this.keysService.getKeys().subscribe(
      keys => {
        this.keyPair.privateK = keys.privateK;
        this.keyPair.publicK = keys.publicK;
        console.log(keys);
        console.log(this.keyPair.publicK, ' ', this.keyPair.privateK);
      },
      error => {
        alert('Nastala chyba');
        // TODO: log error
      }
    );
  }

  public copyKeyToClipboard(keyTextArea) {
    keyTextArea.select();
    document.execCommand('copy');
  }

}
