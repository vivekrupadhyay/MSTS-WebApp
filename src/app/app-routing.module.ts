import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ContactusComponent } from './contactus/contactus.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';

import { BannerComponent } from './banner/banner.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full', data: {
      title: 'Home'
    }
  },
  {
    path: 'login', component: LoginComponent, data: {
      title: 'Login'
    }
  },
  // //{ path: 'login', loadChildren: './login/app.module#AppModuleModule' },
  {
    path: 'register', component: RegistrationComponent, data: {
      title: 'User Registration'
    }
  },
  // //{ path: 'register',loadChildren:'./registration/registration.module#registrationModule' },
  {
    path: 'contactus', component: ContactusComponent, data: {
      title: 'Contact Us'
    }
  },
  // {
  //   path: 'banners', component:ImagemanagerComponent
  // },

  {
    path: 'home', component: HomeComponent, data: {
      title: 'Home'
    }
  },
  { path: 'banner',component: BannerComponent },
  {
    path: 'admin-dashboard',
    component: AdminLayoutComponent,
    children: [{
      path: 'admin-dashboard',
      loadChildren: './admin-layout/admin.module#AdminModule', data: {
        title: 'Admin'
      }
    }]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
