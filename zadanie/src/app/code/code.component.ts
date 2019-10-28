import { Component, OnInit } from '@angular/core';
import { EncryptService } from '../_services/encrypt.service';
import { Key } from '../_models/key';
import { saveAs } from 'file-saver';
import { ModalComponent } from '../modal/modal.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-code',
  templateUrl: './code.component.html',
  styleUrls: ['./code.component.scss']
})
export class CodeComponent implements OnInit {

  encryptLoading: boolean;
  decryptLoading: boolean;

  bsModalRef: BsModalRef;


  keys: Key = new Key();
  fileToUpload: File = null;

  constructor(
    public cryptingService: EncryptService,
    private modalService: BsModalService
    ) {
      this.keys = { privateK: '', publicK: '' };
    }

  ngOnInit() {
    this.encryptLoading = false;
    this.decryptLoading = false;
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

  generateKeys() {
    console.log('funguje');
    this.cryptingService.generateKey().subscribe(
      response => {
        const message = [];

        for (let key in response) {
            message.push(key);
            message.push(response[key]);
        }

        this.openNgModal('Vaše vygenerované kľúče', message);
      },
      err => {
        this.encryptLoading = false;
        alert(err);
      }
    );
  }

  openNgModal(title: string, message: Array<string>) {
    const initialState = {
      list: message,
      title: title
    };
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });
    this.bsModalRef.content.closeBtnName = 'Zavrieť';
  }

}
