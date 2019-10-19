import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ErrorInterceptor } from './helper/error.interceptor';
import { AlertComponent } from './components/alert/alert.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AdminNavbarComponent } from './components/admin-navbar/admin-navbar.component';
import { AdminSidebarComponent } from './components/admin-sidebar/admin-sidebar.component';
//import { LoaderComponent } from './components/loader/loader.component';
import { LoaderModule } from './components/loader/loader.module';
import { TitleService } from './services/title.service';
import { AlertService } from './services/alert.service';

import { BannerComponent } from './banner/banner.component';
import { ScrollTopComponent } from './components/scroll-top/scroll-top.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegistrationComponent,
    AlertComponent,
    ContactusComponent,
    AdminLayoutComponent,
    AdminNavbarComponent,
    AdminSidebarComponent,
    
    BannerComponent,
    
    ScrollTopComponent,
   // LoaderComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    BrowserAnimationsModule
  ],
  exports: [
    AlertComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  providers: [
    TitleService,AlertService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
