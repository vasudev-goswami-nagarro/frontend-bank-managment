import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserProfilesComponent} from './user-profiles/user-profiles.component';
import {AuthGuard} from '../../core/guards/auth.guard';


const routes: Routes = [
  {
    path: '', component: UserProfilesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
