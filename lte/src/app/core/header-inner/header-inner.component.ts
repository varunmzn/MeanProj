import { Component } from '@angular/core';
import { UserService } from '../../shared/user.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-header-inner',
  templateUrl: './header-inner.component.html'
})
export class HeaderInnerComponent {
  constructor(private userService: UserService, private router: Router) { }
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  onProfle(){
    this.router.navigate(['/userprofile']);
  }

}
