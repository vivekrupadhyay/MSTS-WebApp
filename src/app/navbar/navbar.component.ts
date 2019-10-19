import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { User } from '../models/user';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild('stickyMenu', { static: false }) menuElement: ElementRef;
  sticky: boolean = false;
  elementPosition: any;
  isExpanded = false;


  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  currentUser: User;
  adminUser: User;
  email: string;
  constructor(private loginService: LoginService, private router: Router) {
    this.loginService.currentUser.subscribe(x => this.currentUser = x);
    this.loginService.adminUser.subscribe(x => this.adminUser = x);
  }
  ngOnInit() { }
  ngAfterViewInit() {
    this.elementPosition = this.menuElement.nativeElement.offsetTop;
  }
  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.elementPosition) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }

  logoutout() {
    if (this.currentUser != null) {
      debugger;
      this.loginService.LogoutUser();
    }
    if (this.adminUser) {
      this.loginService.LogoutAdmin();
    }

  }

}
