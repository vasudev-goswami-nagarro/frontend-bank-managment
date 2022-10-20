import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {CustomerServiceService} from '../../../core/services/customer-service.service';
import {Transaction} from '../transaction';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent implements OnInit {

  transactionForm!: FormGroup;
  loading!: boolean;
  selected = 'New';
  selectedCustomerNumber: string;
  transactions: Transaction[];
  transaction: Transaction;

  constructor(private router: Router,
              private customerServiceService: CustomerServiceService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.getAllCustomers();
    this.titleService.setTitle('Create Transaction');
    this.createForm();
  }

  getAllCustomers () {
    this.customerServiceService.getCustomers().subscribe(value => {
      this.transactions = value;
    });
  }

  getCustomerByReferenceNumber(customerNumber: string) {
    this.customerServiceService.getCustomerByNumber(customerNumber).subscribe(value => {
      this.transaction = value[0];
      this.patchForm(this.transaction);
    });
  }

  private createForm() {
    this.transactionForm = new FormGroup({
      reference: new FormControl('', [Validators.required]),
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
    console.log(this.transactionForm.getRawValue());
    const reference = this.transactionForm.get('reference')?.value;
    const customerNumber = this.transactionForm.get('customerNumber')?.value;
    const customerName = this.transactionForm.get('customerName')?.value;
    const address = this.transactionForm.get('address')?.value;
    const phone = this.transactionForm.get('phone')?.value;
    const amount = this.transactionForm.get('amount')?.value;
    const currency = this.transactionForm.get('currency')?.value;
    const bank = this.transactionForm.get('bank')?.value;
    const accountNumber = this.transactionForm.get('accountNumber')?.value;
    const paymentDetails = this.transactionForm.get('paymentDetails')?.value;
    const creditDebitDetails = this.transactionForm.get('creditDebitDetails')?.value;
    const selected = this.transactionForm.get('selected')?.value;
    const region = this.transactionForm.get('region')?.value;

    this.customerServiceService.createTransaction(this.transactionForm.getRawValue()).subscribe(value => {
      this.transactions = value;
      console.log(this.transactions);
    });
  }

  clearForm() {
    this.transactionForm.reset();
  }

  patchForm(transaction: Transaction) {
    this.transactionForm.patchValue({
      reference: transaction.reference,
      customerNumber: transaction.customerNumber,
      customerName: transaction.customerName,
      address: transaction.address,
      phone: transaction.phone,
      amount: transaction.amount,
      currency: transaction.currency,
      bank: transaction.bank,
      accountNumber: transaction.accountNumber,
      paymentDetails: transaction.paymentDetails,
      creditDebitDetails: transaction.creditDebitDetails,
      selected: 'Existing',
      region: transaction.region,
    });
  }
}
