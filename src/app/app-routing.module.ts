import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Role} from './shared/constants/role';
import {AuthGuard} from './core/guards/auth.guard';
import {TransactionGuard} from './core/guards/transaction.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'transaction',
    canActivate: [TransactionGuard],
    loadChildren: () => import('./features/transaction/transaction.module').then(m => m.TransactionModule),
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule),
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
