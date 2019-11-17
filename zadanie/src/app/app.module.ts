import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CodeComponent } from './code/code.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { KeysComponent } from './code/keys/keys.component';
import { LoginComponent } from './code/login/login.component';
import { MenuComponent } from './code/menu/menu.component';
import { ContentComponent } from './content/content.component';
import { SignupComponent } from './code/signup/signup.component';
import { FileManagementComponent } from './code/file-management/file-management.component';
import { UploadComponent } from './code/file-management/upload/upload.component';
import { CommentComponent } from './code/comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    CodeComponent,
    KeysComponent,
    LoginComponent,
    MenuComponent,
    ContentComponent,
    SignupComponent,
    FileManagementComponent,
    UploadComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
