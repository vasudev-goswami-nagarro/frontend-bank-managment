import {Injectable} from '@angular/core';
import {InMemoryDbService, RequestInfo} from 'angular-in-memory-web-api';
import {Transaction} from '../../features/transaction/transaction';
import { TRANSACTIONS } from './db.data';
@Injectable({
  providedIn: 'root'
})
export class FakeApiService implements InMemoryDbService {


  createDb(): { transactions: Transaction[] } {
    const transactions = TRANSACTIONS.map(({reference,
                                                  customerNumber,
                                                  customerName,
                                                  address,
                                                  phone,
                                                  amount,
                                                  currency,
                                                  bank,
                                                  accountNumber,
                                                  paymentDetails,
                                                  creditDebitDetails,
                                                  selected,
                                                  region}) => ({
      reference,
      customerNumber,
      customerName,
      address,
      phone,
      amount,
      currency,
      bank,
      accountNumber,
      paymentDetails,
      creditDebitDetails,
      selected,
      region,

    }))
    return {
      transactions
    };
  }


  get(ri: RequestInfo) {
    // if client pinged "api/auth/logout" then send OK status
    if (ri.collectionName === 'auth' && ri.id === 'logout') {
      const { headers, url } = ri;
      return ri.utils.createResponse$(() => ({ status: 200, headers, url }));
    }


    //  otherwise default response of In-memory DB
    return undefined;
  }
}
