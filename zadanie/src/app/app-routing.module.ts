import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './code/login/login.component';
import { AppComponent } from './app.component';
import { AuthGaurdService } from './_services/auth-guard.service';
import { ContentComponent } from './content/content.component';
import { SignupComponent } from './code/signup/signup.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
  {path: '', component: LoginComponent},
  {path: 'content', component: ContentComponent, canActivate:[AuthGaurdService]},
  {path: 'logout', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
