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

  userAlreadyExists = false;

  private authServiceRegisterSub: Subscription;
  private authServicePassSub: Subscription;

  constructor(private router: Router, private authService: AuthenticationService) {   }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.authServiceRegisterSub.unsubscribe();
  }

  checkEqualPasswords(): boolean {
    return this.password !== this.passwordRepeat;
  }

  handleSignUp() {

    if (this.password === this.passwordRepeat
        && this.username.length >= 3
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
      isValid => {
        console.log(isValid);
        if (isValid) {
          console.log('NOT vulnerable af');
        } else {
          console.log('vulnerable af');
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

    if (this.password.length <= 7 && this.password.length <= 20) {
      message += 'The password has to be longer than 7 characters but less than 20. ';
    }

    let regex = new RegExp('(?=.*[a-z])(?=.*[A-Z])');
    if (!regex.test(this.password)) {
      message += 'The password has to have at least 1 upper case character and 1 lower case. ';
    }

    regex = new RegExp('(?=.*[0-9])');
    if (!regex.test(this.password)) {
      message += 'The password has to have at least 1 numerical character. ';
    }

    return message;
  }

}
