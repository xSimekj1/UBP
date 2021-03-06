import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  username = '';
  password = '';
  passwordRepeat = '';
  vulnerabilityMessage = ''
  passwordIsValid: boolean;
  userAlreadyExists = false;

  private authServiceRegisterSub: Subscription;
  private authServicePassSub: Subscription;

  constructor(private router: Router, private authService: AuthenticationService) {   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.authServiceRegisterSub){
      this.authServiceRegisterSub.unsubscribe();
    }
  }

  checkEqualPasswords(): boolean {
    return this.password !== this.passwordRepeat;
  }

  handleSignUp() {

    if (this.password === this.passwordRepeat
        && this.username.length >= 4
        && this.username.length <= 15) {
      this.authServiceRegisterSub = this.authService.registerUser(this.username, this.password).subscribe(
        data => {
          if (data.success) {
            alert('Succesfully registered!');
            this.router.navigate(['/login']);
          } else {
            alert(data.message);
            this.router.navigate(['/signup']);
          }
        },
        error => {
          // TODO: log error
          this.userAlreadyExists = true;
        });
    }
  }

  checkPasswordStrength() {
    this.authServicePassSub = this.authService.checkPasswordStrength(this.password).subscribe(
      passwordMetadata => {
        this.passwordIsValid = passwordMetadata.valid;
        if (this.passwordIsValid) {
          this.vulnerabilityMessage = 'Vaše heslo je dostatočné.';
        } else {
          this.vulnerabilityMessage = passwordMetadata.details;
        }
      },
      error => {
        // TODO: log error
        console.log(error);
      }
    )
  }

  checkPassword(): string {
    let message = '';

    if (this.password.length <= 8 && this.password.length <= 20) {
      message += 'Dĺžka hesla musí byť medzi 8 a 20 znakmi. ';
    }

    let regex = new RegExp('(?=.*[a-z])');
    if (!regex.test(this.password)) {
      message += 'Minimálne 1 malý znak (a-z). ';
    }

    regex = new RegExp('(?=.*[A-Z])');
    if (!regex.test(this.password)) {
      message += 'Minimálne 1 veľký znak (A-Z). ';
    }

    regex = new RegExp('(?=.*[0-9])');
    if (!regex.test(this.password)) {
      message += 'Doplňte aspoň 1 numerický znak.';
    }

    return message;
  }

}
