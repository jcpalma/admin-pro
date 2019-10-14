import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {


  constructor(
    private readonly userService: UserService,
    private readonly router: Router
  ) { }

  canActivate(): boolean {
    if (this.userService.isLogin()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }

}
