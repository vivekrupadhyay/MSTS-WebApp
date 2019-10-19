import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoaderService } from './services/loader.service';
import { TitleService } from './services/title.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(public titleService: TitleService, public loaderService: LoaderService) { }
  
    
  
  ngOnInit() {
    this.titleService.updateTitle();
    this.loaderService.isLoading;
  }
}
