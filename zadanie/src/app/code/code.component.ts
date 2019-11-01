import { Component, OnInit } from '@angular/core';
import { EncryptService } from '../_services/encrypt.service';
import { KeyPair } from '../_models/key';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  encryptLoading: boolean;
  decryptLoading: boolean;

  public keys: KeyPair;
  fileToUpload: File = null;

  constructor(private cryptingService: EncryptService) { }

  ngOnInit() {
    this.encryptLoading = false;
    this.decryptLoading = false;
    this.keys = new KeyPair();
  }

  encryptFile(files: FileList) {

    this.encryptLoading = true;

    this.fileToUpload = files.item(0);

    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('publicKey', this.keys.publicK);

    this.cryptingService.encrypt(formData).subscribe(
      encryptedFile => {
        this.encryptLoading = false;
        const blob = new Blob([encryptedFile]);
        saveAs(blob, 'encrypted.' + this.getType(this.fileToUpload.name) );
      }
    );
  }

  decryptFile(files: FileList) {
    this.decryptLoading = true;

    this.fileToUpload = files.item(0);

    const formData: FormData = new FormData();
    formData.append('file', this.fileToUpload, this.fileToUpload.name);
    formData.append('privateKey', this.keys.privateK);

    this.cryptingService.decrypt(formData).subscribe(
      encryptedFile => {
        this.decryptLoading = false;
        const blob = new Blob([encryptedFile], {type: 'application/x-tar'});
        saveAs(blob, 'decrypted.' +  this.getType(this.fileToUpload.name));
      }
    );
  }

  isEncrypting() {
    const isValid = this.decryptLoading || this.encryptLoading;
    return { 'input-disabled': isValid, 'input-enabled': !isValid };
  }

  havePrivateKey() {
    const isValid = this.keys.privateK;
    return { 'input-disabled': isValid, 'input-enabled': !isValid };
  }

  havePublicKey() {
    const isValid = this.keys.publicK;
    return { 'input-disabled': isValid, 'input-enabled': !isValid };
  }

  getType(filename: string) {
    return filename.substring(filename.lastIndexOf('.') + 1 , filename.length) || filename;
  }

  downloadApp() {
    this.cryptingService.getOfflineApp().subscribe(
      response => {
      const blob = new Blob([response]);
      saveAs(blob, 'offlineapp.jar');
    });
  }

}
