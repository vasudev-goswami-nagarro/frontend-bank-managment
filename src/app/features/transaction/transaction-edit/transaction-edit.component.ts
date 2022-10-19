import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-transaction-edit',
  templateUrl: './transaction-edit.component.html',
  styleUrls: ['./transaction-edit.component.scss']
})
export class TransactionEditComponent implements OnInit {

  transactionForm!: FormGroup;
  loading!: boolean;
  selected = 'New';

  constructor(private router: Router,
              private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Create Transaction');
    this.createForm();
  }

  private createForm() {
    const savedUserEmail = localStorage.getItem('savedUserEmail');

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

  login() {
    console.log(this.transactionForm.getRawValue());

    const reference = this.transactionForm.get('reference')?.value;
    const customerNumber = this.transactionForm.get('customerNumber')?.value;
    const customerName = this.transactionForm.get('')?.value;
    const address = this.transactionForm.get('')?.value;
    const phone = this.transactionForm.get('')?.value;
    const amount = this.transactionForm.get('')?.value;
    const currency = this.transactionForm.get('')?.value;
    const bank = this.transactionForm.get('')?.value;
    const accountNumber = this.transactionForm.get('')?.value;
    const paymentDetails = this.transactionForm.get('')?.value;
    const creditDebitDetails = this.transactionForm.get('')?.value;
    const selected = this.transactionForm.get('')?.value;

    // this.authenticationService
    //   .login(email.toLowerCase(), password)
    //   .subscribe(
    //     data => {
    //       if (rememberMe) {
    //         localStorage.setItem('savedUserEmail', email);
    //       } else {
    //         localStorage.removeItem('savedUserEmail');
    //       }
    //       this.router.navigate(['/']);
    //     },
    //     error => {
    //       this.notificationService.openSnackBar(error.error);
    //       this.loading = false;
    //     }
    //   );
  }

  resetPassword() {
    this.router.navigate(['/auth/password-reset-request']);
  }
}
