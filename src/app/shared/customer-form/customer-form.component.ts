import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {CustomerServiceService} from '../../core/services/customer-service.service';
import {Title} from '@angular/platform-browser';
import {Customer} from './Customer';
import {Transaction} from '../../features/transaction/transaction';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {


  customerForm!: FormGroup;
  loading!: boolean;
  selected = 'New';
  selectedCustomerNumber: string;
  customers: Customer[];
  customer: Customer;
  transactions: Transaction[];
  transaction: Transaction;

  constructor(private router: Router,
              private customerServiceService: CustomerServiceService,
              private formBuilder: FormBuilder,
              private titleService: Title) {
  }

  ngOnInit() {
    this.getAllCustomers();
    this.titleService.setTitle('Customer form');
    this.createForm();
  }

  getAllCustomers () {
    this.customerServiceService.getCustomers().subscribe(value => {
      this.transactions = value;
    });
  }

  getTransactionByReferenceNumber(customerNumber: string) {
    this.customerServiceService.getCustomerByNumber(customerNumber).subscribe(value => {
      this.transaction = value[0];
      this.patchForm(this.transaction);
    });
  }

  private createForm() {
    this.customerForm = new FormGroup({
      references: this.formBuilder.array([this.formBuilder.control(null)], [Validators.required]),
      customerNumber: this.formBuilder.array([this.formBuilder.control(null)], [Validators.required]),
      customerName: this.formBuilder.array([this.formBuilder.control(null)], [Validators.required]),
      address: this.formBuilder.array([this.formBuilder.control(null)], [Validators.required]),
      phone: this.formBuilder.array([this.formBuilder.control(null)], [Validators.required]),
      amount: this.formBuilder.array([this.formBuilder.control(null)], [Validators.required]),
      currency: new FormControl('', Validators.required),
      bank: this.formBuilder.array([this.formBuilder.control(null)],[Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      accountNumber: this.formBuilder.array([this.formBuilder.control(null)]),
      paymentDetails: this.formBuilder.array([this.formBuilder.control(null)], [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      creditDebitDetails: this.formBuilder.array([this.formBuilder.control(null)]),
      selected: new FormControl('New'),
      region: new FormControl('None'),
    });
  }

  submit() {
    console.log(this.customerForm.getRawValue());
  }

  clearForm() {
    this.customerForm.reset();
  }

  addReference(): void {
    (this.customerForm.get('references') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  removeReference(index) {
    (this.customerForm.get('references') as FormArray).removeAt(index);
  }

  getReferencesFormControls(): AbstractControl[] {
    return (<FormArray> this.customerForm.get('references')).controls
  }

  patchForm(transaction: Transaction) {
    this.customerForm.patchValue({
      references: [transaction.reference],
      customerNumber: [transaction.customerNumber],
      customerName: [transaction.customerName],
      address: [transaction.address],
      phone: [transaction.phone],
      amount: [transaction.amount],
      currency: [transaction.currency],
      bank: [transaction.bank],
      accountNumber: [transaction.accountNumber],
      paymentDetails: [transaction.paymentDetails],
      creditDebitDetails: [transaction.creditDebitDetails],
      selected: 'Existing',
      region: transaction.region,
    });
  }

  getCustomerNumberFormControls() {
    return (<FormArray> this.customerForm.get('customerNumber')).controls

  }

  removeCustomerNumber(index: number) {
    (this.customerForm.get('customerNumber') as FormArray).removeAt(index);

  }

  addCustomerNumber() {
    (this.customerForm.get('customerNumber') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  getCustomerNameFormControls() {
    return (<FormArray> this.customerForm.get('customerName')).controls

  }

  getAddressesFormControls() {
    return (<FormArray> this.customerForm.get('address')).controls

  }

  removeAddress(index: number) {
    (this.customerForm.get('address') as FormArray).removeAt(index);

  }

  addAddress() {
    (this.customerForm.get('address') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  getPhonesFormControls() {
    return (<FormArray> this.customerForm.get('phone')).controls

  }

  removePhone(index: number) {
    (this.customerForm.get('phone') as FormArray).removeAt(index);

  }

  addPhone() {
    (this.customerForm.get('phone') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  getAmountsFormControls() {
    return (<FormArray> this.customerForm.get('amount')).controls

  }

  removeAmount(index: number) {
    (this.customerForm.get('amount') as FormArray).removeAt(index);

  }

  addAmount() {
    (this.customerForm.get('amount') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  getBanksFormControls() {
    return (<FormArray> this.customerForm.get('bank')).controls

  }

  removeBank(index: number) {
    (this.customerForm.get('bank') as FormArray).removeAt(index);

  }

  addBank() {
    (this.customerForm.get('bank') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  getAccountNumbersFormControls() {
    return (<FormArray> this.customerForm.get('accountNumber')).controls

  }

  removeAccountNumber(index: number) {
    (this.customerForm.get('accountNumber') as FormArray).removeAt(index);

  }

  addAccountNumber() {
    (this.customerForm.get('accountNumber') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  removePaymentDetails(index: number) {
    (this.customerForm.get('paymentDetails') as FormArray).removeAt(index);

  }

  addPaymentDetails() {
    (this.customerForm.get('paymentDetails') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  getPaymentDetailsFormControls() {
    return (<FormArray> this.customerForm.get('paymentDetails')).controls

  }

  getCreditDebitDetailsFormControls() {
    return (<FormArray> this.customerForm.get('creditDebitDetails')).controls

  }

  addCreditDebitDetails() {
    (this.customerForm.get('creditDebitDetails') as FormArray).push(
      this.formBuilder.control(null)
    );
  }

  removeCreditDebitDetails(index: number) {
    (this.customerForm.get('creditDebitDetails') as FormArray).removeAt(index);

  }

  removeCustomerNames(index: number) {
    (this.customerForm.get('customerName') as FormArray).removeAt(index);

  }

  addCustomerNames() {
    (this.customerForm.get('customerNames') as FormArray).push(
      this.formBuilder.control(null)
    );
  }
}
