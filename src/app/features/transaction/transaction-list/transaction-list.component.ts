import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import transactions from 'src/assets/transactions.json';
import {MatPaginator} from '@angular/material/paginator';
import {Transaction} from '../transaction';
import {TransactionService} from '../../../core/services/transaction.service';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent implements OnInit, AfterViewInit  {

  transactions: Transaction[] = transactions;
  displayedColumns: string[] = ['reference', 'customerName', 'amount', 'currency'];
  dataSource = new MatTableDataSource(transactions);

  @ViewChild(MatSort, { static: true })
    // tslint:disable-next-line:new-parens
  sort: MatSort = new MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private titleService: Title,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.titleService.setTitle('angular-material-template - Customers');
    this.dataSource.sort = this.sort;
    this.transactionService.getTransactions().subscribe(value => {
      this.transactions = value;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
