import{Injectable} from '@angular/core';
import{HttpRequest,HttpHandler,HttpEvent, HttpInterceptor} from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { Observable,throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor{
    constructor(private loginServices:LoginService){}
    intercept(request:HttpRequest<any>,next:HttpHandler):Observable<HttpEvent<any>>{
        return next.handle(request).pipe(catchError(err=>{
            if(err.status===401){
                this.loginServices.LogoutUser();
                location.reload(true);
            }
            const error=err.error.message||err.statusText;
            return throwError(error);
        }))
    }
}