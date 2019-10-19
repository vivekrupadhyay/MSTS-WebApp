export class ToastrNotification {
    type: NotificationType;  
    message: string;  
}
 
export enum NotificationType {  
    Success,  
    Error,  
    Info,  
    Warning  
}  