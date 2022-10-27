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
  selected = 'New';
  selectedCustomerNumber: string;
  customer: Customer;
  transactions: Transaction[];
  transaction: Transaction;
  selectedRegion: any;
  isNewForm = true;

  constructor(private router: Router,
              private customerServiceService: CustomerServiceService,
              private formBuilder: FormBuilder,
              private titleService: Title) {
  }

  ngOnInit() {
    this.getAllCustomers();
    this.titleService.setTitle('Customer form');
    this.createNewForm();
  }

  getAllCustomers() {
    this.customerServiceService.getCustomers().subscribe(value => {
      this.transactions = value;
    });
  }

  getTransactionByReferenceNumber(customerNumber: string) {
    this.createExistingForm();
    this.customerServiceService.getCustomerByNumber(customerNumber).subscribe(value => {
      this.transaction = value[0];
      this.patchForm(this.transaction);
    });
  }

  createExistingForm() {
    this.customerForm = new FormGroup({
      reference: this.formBuilder.array([this.formBuilder.control(null, [Validators.required])]),
      customerNumber: this.formBuilder.array([this.formBuilder.control(null, [Validators.required])]),
      customerName: this.formBuilder.array([this.formBuilder.control(null, [Validators.required])]),
      address: this.formBuilder.array([this.formBuilder.control(null, [Validators.required])]),
      phone: this.formBuilder.array([this.formBuilder.control(null, [Validators.required])]),
      amount: this.formBuilder.array([this.formBuilder.control(null, [Validators.required])]),
      currency: new FormControl('', Validators.required),
      bank: this.formBuilder.array([this.formBuilder.control(null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')])]),
      accountNumber: this.formBuilder.array([this.formBuilder.control(null, [Validators.required])]),
      paymentDetails: this.formBuilder.array([this.formBuilder.control(null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')])]),
      creditDebitDetails: this.formBuilder.array([this.formBuilder.control(null, [Validators.required])]),
      selected: new FormControl('Existing'),
      region: new FormControl('None'),
    });
    this.isNewForm = false;
  }

  submit() {
    console.log(this.customerForm.getRawValue());
  }

  createNewForm() {
    this.customerForm = new FormGroup({
      reference: this.formBuilder.array([this.formBuilder.control(null)]),
      customerNumber: this.formBuilder.array([this.formBuilder.control({value: '', disabled: true})]),
      customerName: this.formBuilder.array([this.formBuilder.control(null, [Validators.required])]),
      address: this.formBuilder.array([this.formBuilder.control(null)]),
      phone: this.formBuilder.array([this.formBuilder.control(null)]),
      amount: this.formBuilder.array([this.formBuilder.control(null)]),
      currency: new FormControl(''),
      bank: this.formBuilder.array([this.formBuilder.control(null)]),
      accountNumber: this.formBuilder.array([this.formBuilder.control(null)]),
      paymentDetails: this.formBuilder.array([this.formBuilder.control(null)]),
      creditDebitDetails: this.formBuilder.array([this.formBuilder.control(null)]),
      selected: new FormControl({value: 'New'}),
      region: new FormControl('None'),
    });
    this.customerForm.reset();
    this.isNewForm = true;
    this.selectedCustomerNumber = '';
  }

  addReference(): void {
    (this.customerForm.get('reference') as FormArray).push(
      this.formBuilder.control(null, [Validators.required])
    );
  }

  removeReference(index) {
    (this.customerForm.get('reference') as FormArray).removeAt(index);
  }

  getReferencesFormControls(): AbstractControl[] {
    return (this.customerForm.get('reference') as FormArray).controls;
  }

  patchForm(transaction: Transaction) {
    this.customerForm.patchValue({
      reference: [transaction.reference],
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
    return (this.customerForm.get('customerNumber') as FormArray).controls;

  }

  removeCustomerNumber(index: number) {
    (this.customerForm.get('customerNumber') as FormArray).removeAt(index);

  }

  addCustomerNumber() {
    (this.customerForm.get('customerNumber') as FormArray).push(
      this.formBuilder.control(null, [Validators.required])
    );
  }

  getCustomerNameFormControls() {
    return (this.customerForm.get('customerName') as FormArray).controls;

  }

  getAddressesFormControls() {
    return (this.customerForm.get('address') as FormArray).controls;

  }

  removeAddress(index: number) {
    (this.customerForm.get('address') as FormArray).removeAt(index);

  }

  addAddress() {
    (this.customerForm.get('address') as FormArray).push(
      this.formBuilder.control(null, [Validators.required])
    );
  }

  getPhonesFormControls() {
    return (this.customerForm.get('phone') as FormArray).controls;

  }

  removePhone(index: number) {
    (this.customerForm.get('phone') as FormArray).removeAt(index);

  }

  addPhone() {
    (this.customerForm.get('phone') as FormArray).push(
      this.formBuilder.control(null, [Validators.required])
    );
  }

  getAmountsFormControls() {
    return (this.customerForm.get('amount') as FormArray).controls;

  }

  removeAmount(index: number) {
    (this.customerForm.get('amount') as FormArray).removeAt(index);

  }

  addAmount() {
    (this.customerForm.get('amount') as FormArray).push(
      this.formBuilder.control(null, [Validators.required])
    );
  }

  getBanksFormControls() {
    return (this.customerForm.get('bank') as FormArray).controls;

  }

  removeBank(index: number) {
    (this.customerForm.get('bank') as FormArray).removeAt(index);

  }

  addBank() {
    (this.customerForm.get('bank') as FormArray).push(
      this.formBuilder.control(null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
    );
  }

  getAccountNumbersFormControls() {
    return (this.customerForm.get('accountNumber') as FormArray).controls;

  }

  removeAccountNumber(index: number) {
    (this.customerForm.get('accountNumber') as FormArray).removeAt(index);

  }

  addAccountNumber() {
    (this.customerForm.get('accountNumber') as FormArray).push(
      this.formBuilder.control(null, [Validators.required])
    );
  }

  removePaymentDetails(index: number) {
    (this.customerForm.get('paymentDetails') as FormArray).removeAt(index);

  }

  addPaymentDetails() {
    (this.customerForm.get('paymentDetails') as FormArray).push(
      this.formBuilder.control(null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')])
    );
  }

  getPaymentDetailsFormControls() {
    return (this.customerForm.get('paymentDetails') as FormArray).controls;

  }

  getCreditDebitDetailsFormControls() {
    return (this.customerForm.get('creditDebitDetails') as FormArray).controls;

  }

  addCreditDebitDetails() {
    (this.customerForm.get('creditDebitDetails') as FormArray).push(
      this.formBuilder.control(null, [Validators.required])
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
      this.formBuilder.control(null, [Validators.required])
    );
  }
}
