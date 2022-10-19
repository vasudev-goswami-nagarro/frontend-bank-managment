import {Component, OnInit} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable, Subscription, timer} from 'rxjs';
import {map, shareReplay} from 'rxjs/operators';
import {AuthService} from '../../core/services/auth.service';
import {AuthGuard} from '../../core/guards/auth.guard';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  userName = '';
  isAdmin = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver,
              private authGuard: AuthGuard,
              private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    this.isAdmin = user?.isAdmin;
    this.userName = user?.username;
  }
}
