import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';


@Component({
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  })
export class LoginComponent implements OnInit, OnDestroy {
    loginForm!: FormGroup;
    loading = false;
    submitted = false;
    returnUrl!: string;
    subscription!: Subscription;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private loginService: LoginService
    ) {
        // redirect to home if already logged in
        if (this.loginService.isUserLoggedIn()) {
            this.router.navigate(['home']);
        }
    }
    
    ngOnDestroy(): void {
        if(this.subscription)
            this.subscription.unsubscribe();
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    // convenience getter for easy access to form fields
    get form() { return this.loginForm.controls; }

    async onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.subscription =  this.loginService.login(this.form['username'].value, this.form['password'].value).subscribe(()=>{
          this.router.navigate(['home']);
        },()=>{
          this.loading = false;
        })

            
    }
}