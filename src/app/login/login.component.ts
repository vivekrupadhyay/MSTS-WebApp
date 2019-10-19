import { Component, OnInit, Output, EventEmitter } from '@angular/core';
//import { Http, Headers } from '@angular/http';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../services/login.service';
import { Login } from '../models/login';
import { AlertService } from '../services/alert.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  title: string = "Please Login";
  // login = new Login();
  output: any;
  isUserLoggedIn: boolean = false;
  @Output() messageEvent = new EventEmitter<boolean>();
  errorMessage: any;
  submitted = false;
  constructor(private _fb: FormBuilder, private _avRoute: ActivatedRoute,
    private _router: Router, public loginservice: LoginService,
    private alertService: AlertService, private loding: LoaderService) { }
  ngOnInit() {
    this.loginForm = this._fb.group({

      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.loginForm.controls; }
  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  save() {
    debugger;
    this.submitted = true;
    if (!this.loginForm.valid) {
      return;
    }
    let login: Login;
    login = {
      email: this.email.value,
      password: this.password.value
    };
    //this.loding.show();
    this.loginservice.Login(login).subscribe(response => {
      debugger;
      if (response.Token == null && response.Usertype == "0") {

        this.alertService.info("Unauthorise user !!");
        this._router.navigate(['/login']);

      }
      else if (response.Usertype == "1") {
        this.isUserLoggedIn = true;
        this.messageEvent.emit(this.isUserLoggedIn)
        this._router.navigate(['/admin-dashboard']);
        this.alertService.success("Success !!");
      }
      else if (response.Usertype == "2") {
        this._router.navigate(['/home']);
      }
      else {
        this.alertService.info("Unauthorise user !!");
      }
      //this.alertService.success('Login successful', true);
      //this.loding.hide();
    },
      error => {
        debugger;
        this.alertService.error(error);
        //this.loding.hide();
      });
  }

}
