import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserProfilesComponent} from './user-profiles/user-profiles.component';


const routes: Routes = [
  {
    path: '', component: UserProfilesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
