import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Transaction} from '../../features/transaction/transaction';
import transactions from 'src/assets/transactions.json';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private transactions: BehaviorSubject<Transaction[]> =
    new BehaviorSubject<Transaction[]>(transactions);

  constructor() { }

  getTransactions() {
    return this.transactions;
  }
}
