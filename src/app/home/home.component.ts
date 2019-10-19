import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { Observable } from 'rxjs';
import { HomeService } from '../services/home.service';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //currentUser: User;
  bannerData: Observable<any>;
  bannerImage:any[];
  constructor(private homeService:HomeService,public loading:LoaderService) {
   
   }

  ngOnInit() {
    debugger;
    //this.loading.show();
    // this.bannerData=this.homeService.getBanner();
    // this.bannerData.subscribe((res:any)=>{
    //   this.bannerImage=res.banner;
    // });
  }

}
