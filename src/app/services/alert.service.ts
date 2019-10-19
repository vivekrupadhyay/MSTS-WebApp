import { Injectable } from '@angular/core';  
import { Router, NavigationStart } from '@angular/router';  
import { Observable, Subject } from 'rxjs';  
import { ToastrNotification, NotificationType } from '../models/toastr-notification.model'; 

@Injectable({ providedIn: 'root' })
export class AlertService {
    
    public subject = new Subject<ToastrNotification>();  
    public keepAfterRouteChange = true;  
  
    constructor(public router: Router) {  
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true  
        router.events.subscribe(event => {  
            if (event instanceof NavigationStart) {  
                if (this.keepAfterRouteChange) {  
                    // only keep for a single route change  
                    this.keepAfterRouteChange = false;  
                } else {  
                    // clear alert messages  
                    this.clear();  
                }  
            }  
        });  
    }  
  
    getAlert(): Observable<any> {  
        return this.subject.asObservable();  
    }  
  
    success(message: string, keepAfterRouteChange = false) {  
        this.showNotification(NotificationType.Success, message, keepAfterRouteChange);  
    }  
  
    error(message: string, keepAfterRouteChange = false) {  
        this.showNotification(NotificationType.Error, message, keepAfterRouteChange);  
    }  
  
    info(message: string, keepAfterRouteChange = false) {  
        this.showNotification(NotificationType.Info, message, keepAfterRouteChange);  
    }  
  
    warn(message: string, keepAfterRouteChange = false) {  
        this.showNotification(NotificationType.Warning, message, keepAfterRouteChange);  
    }  
  
    showNotification(type: NotificationType, message: string, keepAfterRouteChange = false) {  
        this.keepAfterRouteChange = keepAfterRouteChange;  
        this.subject.next(<ToastrNotification>{ type: type, message: message });  
    }  
  
    clear() {  
        this.subject.next();  
    }  
}