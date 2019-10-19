import { Component, OnInit, OnDestroy } from '@angular/core';
  
import { ToastrNotification, NotificationType } from "../../models/toastr-notification.model";  
import { AlertService } from "../../services/alert.service";  

@Component({
    selector: 'alert',
    templateUrl: 'alert.component.html',
    styleUrls: ['alert.component.css']
})

export class AlertComponent implements OnInit {
    debugger;
    notifications: ToastrNotification[] = [];  
  
    constructor(public notificationService: AlertService) { }  
  
    ngOnInit() {  
        
        this.notificationService.getAlert().subscribe((alert: ToastrNotification) => {  
            this.notifications = [];  
            if (!alert) {  
                this.notifications = [];  
                return;  
            }  
            this.notifications.push(alert);  
            setTimeout(() => {  
                this.notifications = this.notifications.filter(x => x !== alert);  
            }, 8000);  
        });  
    }  
  
    removeNotification(notification: ToastrNotification) {  
        this.notifications = this.notifications.filter(x => x !== notification);  
    }  
  
    /**Set css class for Alert -- Called from alert component**/      
    cssClass(notification: ToastrNotification) {  
        
        if (!notification) {  
            return;  
        }  
        switch (notification.type) {  
            case NotificationType.Success:  
                return 'toast-success';  
            case NotificationType.Error:  
                return 'toast-error';  
            case NotificationType.Info:  
                return 'toast-info';  
            case NotificationType.Warning:  
                return 'toast-warning';  
        }  
    }  
}