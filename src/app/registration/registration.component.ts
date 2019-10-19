import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { MustMatch } from '../helper/must-match.validator';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';
import { AlertService } from '../services/alert.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  //UserModel: User = new User();
  registrationResult: Observable<any>;
  output: any;
  title = "User Registration";
  constructor(private formBuilder: FormBuilder,
    private _Route: Router,
    private userService: UserService,
    private alertService: AlertService,
    public loaderService: LoaderService,
     private http: HttpClient
    ) { }

  ngOnInit() {
    // const page = localStorage.getItem('currentPage');
    // localStorage.setItem('currentPage', 'register');
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
        validator: MustMatch('password', 'confirmPassword')
      });
  }
  get f() { return this.registerForm.controls; }
  get firstName() { return this.registerForm.get('firstName'); }
  get lastName() { return this.registerForm.get('lastName'); }
  get email() { return this.registerForm.get('email'); }
  get password() { return this.registerForm.get('password'); }
  get confirmPassword() { return this.registerForm.get('confirmPassword'); }

  reset(){
    this.registerForm.reset();
    
  }


  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      localStorage.setItem('isLoggedIn', 'false');
      return;
    }
    else {
      let newUser: User;
      newUser = {
        firstName: this.firstName.value,
        lastName: this.lastName.value,
        email: this.email.value,
        password: this.password.value,
        confirmPassword: this.confirmPassword.value
      };
      this.userService.onSubmit(newUser).subscribe(
        response => {
          this.output = response
          if (this.output.StatusCode == "409") {
            
            this.alertService.error('This record already exists.');
          }
          else if (this.output.StatusCode == "200") {
            
            this.alertService.success('Registration successful.', true);
            this._Route.navigate(['/home']);
          }
          else {
            this.alertService.error('Something went wrong.');
            
            this._Route.navigate(['/login']);
          }
        });
    }
  }
  
}


