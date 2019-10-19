import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {User} from '../models/user';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  debugger;
  private data: any;
  private apiUrl = environment.apiEndpoint + "/api/user";
  

  constructor(private http:HttpClient) {
    this.data=JSON.parse(localStorage.getItem('AdminUser'));
    
   }
    onSubmit(userModel:User){
    var apiRegUrl = environment.apiEndpoint + "/api/user/create";
     let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    
    return this.http.post<any>(apiRegUrl, userModel, { headers: headers })
            .pipe(
                catchError(this.handleError)
            );
   }
   private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error.message);
    } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
        console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
};
}
