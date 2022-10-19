import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TransactionHomeComponent} from './transaction-home/transaction-home.component';
import {TransactionEditComponent} from './transaction-edit/transaction-edit.component';
import {TransactionListComponent} from './transaction-list/transaction-list.component';


const routes: Routes = [
  {
    path: 'home',
    component: TransactionHomeComponent
  },
  {
    path: 'transaction-edit',
    component: TransactionEditComponent
  },
  {
    path: 'transaction-list',
    component: TransactionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TransactionRoutingModule { }
