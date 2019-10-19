import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../services/loader.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
  // show = false;
  // private subscription: Subscription;
  constructor(public loaderService: LoaderService, private http: HttpClient) { }

  ngOnInit() {
    // debugger;
    // this.subscription = this.loaderService.loaderState
    //   .subscribe((state: LoaderState) => {
    //     this.show = state.show;
    //   });
  }
  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }
}
