import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../shared/constants/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) {
  }

  login(username: string, password: string) {
    return of(true)
      .pipe(
        map((/*response*/) => {
          localStorage.setItem('currentUser', JSON.stringify({
            isAdmin: true,
            username,
            password
          }));
          return true;
        }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['../', 'auth', 'login']);
  }

  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return JSON.parse(user) as User;
  }
}
