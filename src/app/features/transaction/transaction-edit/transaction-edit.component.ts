import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CustomerServiceService} from '../../../core/services/customer-service.service';
import {Transaction} from '../transaction';
import {Customer} from '../customer';
import customer from 'src/assets/customer.json';
import {TransactionService} from '../../../core/services/transaction.service';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent implements OnInit {

  transactionForm!: FormGroup;
  loading!: boolean;
  selected = 'New';
  transactions: Transaction[] = [];
  customer: Customer = customer;

  constructor(private router: Router,
              private customerServiceService: CustomerServiceService,
              private transactionService: TransactionService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Create Transaction');
    this.createForm();
  }

  getCustomerByCustomerNumber() {
    const value1 = this.transactionForm.get('customerNumber').value;
    if (value1 === customer.responseXML.getCustomerInfoResponse.getCustomerInfoResult.CUST_INFO.CUST_NO) {
      this.patchForm();
    }
  }

  private createForm() {
    this.transactionForm = new FormGroup({
      reference: new FormControl(this.createReference(), [Validators.required]),
      customerNumber: new FormControl('', Validators.required),
      customerName: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      amount: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
      bank: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      accountNumber: new FormControl('', Validators.required),
      paymentDetails: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      creditDebitDetails: new FormControl('', Validators.required),
      selected: new FormControl('New'),
      region: new FormControl('None'),
    });
  }

  submit() {
    this.transactionService.getTransactions().subscribe(value => {
      this.transactions = value;
      this.transactions.push(this.transactionForm.getRawValue());
    });
    this.transactionService.getTransactions().next(this.transactions);
    this.router.navigate(['transaction', 'home']);
  }

  clearForm() {
    this.transactionForm.reset();
    this.transactionForm.patchValue({
      selected: 'New',
      reference: this.createReference()
    });
  }

  patchForm() {
    this.transactionForm.patchValue({
      customerName: this.customer.responseXML.getCustomerInfoResponse.getCustomerInfoResult.CUST_INFO.SHORT_NAME,
      address: this.customer.responseXML.getCustomerInfoResponse.getCustomerInfoResult.CUST_INFO.ADDRESS_LINE2
          .concat(this.customer.responseXML.getCustomerInfoResponse.getCustomerInfoResult.CUST_INFO.ADDRESS_LINE2),
      phone: this.customer.responseXML.getCustomerInfoResponse
        .getCustomerInfoResult.CUST_INFO.CONTACT_INFO_V7.CONTACT_INFO_V7
        .PHONE_LIST_V7.PHONE_LIST_ITEM_V7.PHONE,
    });
  }

  private  createReference() {
    return `CUS${Math.floor(10000 * Math.random())}${Math.floor(100 * Math.random())}${Math.floor(100 * Math.random())}`;
  }
}
