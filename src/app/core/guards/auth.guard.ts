import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authService.getCurrentUser();
    console.log(currentUser);
    if (currentUser && currentUser.username) {
      const authorities = next.data.authorities;
      if (authorities[0] === 'admin') {
        return true;
      }
      this.router.navigate(['accessdenied']);
      return false;
    }

    this.router.navigate(['../', 'auth', 'login']);
    return false;
  }

}
