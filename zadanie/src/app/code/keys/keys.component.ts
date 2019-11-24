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
    this.getKeys(false);
  }

  public getKeys(isNewKeys: boolean) {
    this.keysService.getKeys(isNewKeys).subscribe(
      keys => {
        if (keys['privateK'] == null && keys['publicK'] == null){
          alert('Neexistujú žiadne priradené kľúče. Prosím stlačte tlačidlo'+
          ' Generuj kľúče');
        }else{
          this.keyPair.privateK = keys.privateK;
          this.keyPair.publicK = keys.publicK;
        }
      },
      error => {
        // TODO: log error
        // TODO: show error for user
        alert('Nastala chyba');
      }
    );
  }

  public copyKeyToClipboard(keyTextArea) {
    keyTextArea.select();
    document.execCommand('copy');
  }

}
