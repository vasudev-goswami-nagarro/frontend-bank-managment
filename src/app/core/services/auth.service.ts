import {Injectable} from '@angular/core';
import {BehaviorSubject, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../../shared/constants/user';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  constructor(private router: Router) {
  }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  updateIsLoggedIn(flag: boolean) {
    this.loggedIn.next(true);
  }

  login(username: string, password: string) {
    this.loggedIn.next(true);
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
    this.loggedIn.next(false);
    localStorage.removeItem('currentUser');
    this.router.navigate(['../', 'auth', 'login']);
  }


  getCurrentUser(): any {
    const user = localStorage.getItem('currentUser');
    return JSON.parse(user) as User;
  }
}
