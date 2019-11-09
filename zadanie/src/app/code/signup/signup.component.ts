import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  username: string;
  password: string;
  passwordRepeat: string;
  errorMessage1 = 'Passwords do not match!';
  errorMessage2 = 'Username already in user OR insufficient password strength! TODO!';
  notEqualPasswords = false;
  usedUsername = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {   }

  ngOnInit() {
  }

  handleSignUp() {
    if (this.checkEqualPasswords(this.password, this.passwordRepeat)) {
      this.authenticationService.authenticationServiceRegister(this.username, this.password).subscribe(
        (data) => {
        if (data['success']) {
          alert("Succesfully registered!");
          this.router.navigate(['/login']);
        } else {
          alert(data['message']);
          this.router.navigate(['/signup']);
        }
      },
      () => {
        this.usedUsername = true;
      });
      this.notEqualPasswords = false;
    } else {
      this.notEqualPasswords = true;
    }
  }

  checkEqualPasswords(password, repeatedPassword): boolean {
    return password === repeatedPassword;
  }
}
