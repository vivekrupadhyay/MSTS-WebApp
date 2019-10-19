// import { Injectable } from '@angular/core';
// import { LoaderState } from '../models/loader.model';
// import { Subject } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoaderService {
//   debugger;
//   private loaderSubject = new Subject<LoaderState>();

//   loaderState = this.loaderSubject.asObservable();
  
//   constructor() { }
//   show() {
//     this.loaderSubject.next(<LoaderState>{ show: true });
//   }
//   hide() {
//     this.loaderSubject.next(<LoaderState>{ show: false });
//   }
// }
import { Injectable } from '@angular/core';
import { BehaviorSubject,Observable} from 'rxjs';

@Injectable()
export class LoaderService {
    public isLoading = new BehaviorSubject(false);

    constructor() {}
}


