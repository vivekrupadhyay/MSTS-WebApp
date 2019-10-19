import { Injectable, Output, EventEmitter } from '@angular/core';
import { Login } from "../models/login";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { AlertService } from './alert.service';



@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public token: string = "";
  //For Normal User
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  //For Admin User
  private adminUserSubject: BehaviorSubject<User>;
  public adminUser: Observable<User>;


  constructor(private http: HttpClient, private rote: Router,private alertService:AlertService) {
    //For Normal User
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    //For Admin User
    this.adminUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('AdminUser')));
    this.adminUser = this.adminUserSubject.asObservable();
  }
  private apiUrl = environment.apiEndpoint + "/api/Authenticate";

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  public get adminUserValue(): User {
    return this.adminUserSubject.value;
  }

  public Login(login: Login) {
    debugger;
    let headers = new HttpHeaders({ 'Content-Type': "application/json" });
    return this.http.post<any>(this.apiUrl, login, { headers: headers })
      .pipe(tap(data => {
        debugger;
        if (data.Token != null) {
          debugger;
          if (data.Usertype == "1") {
            localStorage.setItem('AdminUser', JSON.stringify({ email: login.email, token: data.Token }));
            this.currentUserSubject.next(data);
            return data;
          }
          else if (data.Usertype == "2") {
            localStorage.setItem('currentUser', JSON.stringify({ email: login.email, token: data.Token }));
            this.adminUserSubject.next(data);
            return data;
          }
          return data;
        }
        else {
            //this.alertService.info("Unauthorise user !!");
             return null;
        }
      }),
        catchError(this.handleError)
      );
  }

  LogoutUser() {
    debugger;
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.rote.navigate(['/home']);


  }
  LogoutAdmin() {
    localStorage.removeItem('AdminUser');
    this.adminUserSubject.next(null);
    this.rote.navigate(['/login']);
  }
  private handleError(error: HttpErrorResponse) {
    debugger;
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    }
    else {
      debugger;
      console.error(`Backend returned code ${error.status}` + `body was:${error.error}`);
    }
    return throwError('Something bad happened, please try again..');
  };
}
