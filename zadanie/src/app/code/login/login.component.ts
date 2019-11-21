import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../_services/auth.service';
import { TokenStorage } from 'src/app/_models/tokenstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;
  errorMessage = 'Invalid Credentials';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  handleLogin() {
    this.authenticationService.authenticationService(this.username, this.password).subscribe(
      data => {
      sessionStorage.setItem('accessToken', data['accessToken']);
      sessionStorage.setItem('username', this.username);
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Login Successful.';
      if (data['role'] == '[ROLE_ADMIN]'){
        sessionStorage.setItem('admin', 'true');
      }
      this.router.navigate(['/content']);
    }, () => {9
      this.invalidLogin = true;
      this.loginSuccess = false;
    });
  }
}
