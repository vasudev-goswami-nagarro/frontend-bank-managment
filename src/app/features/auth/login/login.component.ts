import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private router: Router,
              private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  get data() { return this.loginForm.controls; }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    } else if ((this.data.username.value === 'user'
      && this.data.password.value === 'user') ||
      (this.data.username.value === 'admin'
        && this.data.password.value === 'admin')
    ) {
      this.authService.login(this.data.username.value, this.data.password.value).subscribe(value => {
        this.router.navigate(['/transaction/home']);
      });
    } else {
      this.submitted = true;
    }
  }
}
