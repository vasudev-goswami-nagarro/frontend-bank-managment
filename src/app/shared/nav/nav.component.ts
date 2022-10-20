import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription, timer} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from '../../core/services/auth.service';
import {AuthGuard} from '../../core/guards/auth.guard';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userName = '';
  isAdmin = false;
  isLoggedIn$: Observable<boolean>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authGuard: AuthGuard,
              private router: Router,
              private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.isHandset$.subscribe(value => {
      console.log(value);
    })
    const user = this.authService.getCurrentUser();
    if (user?.username) {
      this.authService.updateIsLoggedIn(true);
    }
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.isAdmin = user?.isAdmin;
    this.userName = user?.username;
  }

  navigate() {
    this.authService.isLoggedIn.subscribe(value => {
      if (value) {
        this.router.navigate(['transaction', 'home']);
      } else {
        this.router.navigate(['auth', 'login']);
      }
    });
  }
}
