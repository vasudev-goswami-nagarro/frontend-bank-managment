import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccessDeniedComponent} from './access-denied/access-denied.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {
    path: 'accessdenied', component: AccessDeniedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
