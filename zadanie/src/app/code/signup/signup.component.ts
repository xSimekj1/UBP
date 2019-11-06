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
  password : string;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService) {   }

  ngOnInit() {
  }

  handleLogin() {
    this.authenticationService.authenticationServiceRegister(this.username, this.password).subscribe(
      (data)=> {
      if (data['success']){
        alert("Succesfully registered!")
        this.router.navigate(['/login']);
      }else{
        alert(data['message'])
        this.router.navigate(['/signup']);
      }
    });    
  }
}
