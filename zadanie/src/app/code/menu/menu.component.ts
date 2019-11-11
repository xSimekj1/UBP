import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  isLoggedIn = false;
  public username: string;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.isLoggedIn = this.authenticationService.isUserLoggedIn();
    this.username = sessionStorage.getItem('username');
    console.log('menu ->' + this.isLoggedIn);
  }

  handleLogout() {
    this.router.navigate(['./login']);
    this.authenticationService.logout();
  }

  redirectLog() {
    this.router.navigate(['./login']);
  }

  redirectReg() {
    this.router.navigate(['./signup']);
  }

}
