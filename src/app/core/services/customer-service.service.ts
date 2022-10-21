import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Transaction} from '../../features/transaction/transaction';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService {


  constructor(private http: HttpClient) {
  }

  getCustomerByNumber(cn: string): Observable<Transaction[]> {
    const headers = new HttpHeaders({
      'x-api-key': environment.customerApiKey
    });
    console.log('fetching data for customer number ', cn);
    return this.http.get<Transaction[]>(environment.endpoint + '/transactions', {headers}).pipe(
      map(value => {
        return value.filter(value1 => value1.customerNumber === cn);
      })
    );
  }

  getCustomers(): Observable<Transaction[]> {
    const headers = new HttpHeaders({
      'x-api-key': environment.customerApiKey
    });
    return this.http.get<Transaction[]>(environment.endpoint + '/transactions', {headers});
  }
}
