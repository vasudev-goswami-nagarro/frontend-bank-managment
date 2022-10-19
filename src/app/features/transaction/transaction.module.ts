import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionRoutingModule } from './transaction-routing.module';
import { TransactionHomeComponent } from './transaction-home/transaction-home.component';
import { TransactionEditComponent } from './transaction-edit/transaction-edit.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {ReactiveFormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatDividerModule} from '@angular/material/divider';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
import {MatSortModule} from '@angular/material/sort';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [TransactionHomeComponent, TransactionEditComponent, TransactionListComponent],
  imports: [
    CommonModule,
    TransactionRoutingModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    MatCardModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatInputModule,
    MatDividerModule,
    MatSortModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatRadioModule
  ]
})
export class TransactionModule { }
