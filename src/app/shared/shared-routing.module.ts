import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccessDeniedComponent} from './access-denied/access-denied.component';
import {TableComponent} from './table/table.component';
import {CustomerFormComponent} from './customer-form/customer-form.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'table', component: TableComponent},
  {path: 'customer-form', component: CustomerFormComponent},
  {
    path: 'accessdenied', component: AccessDeniedComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
