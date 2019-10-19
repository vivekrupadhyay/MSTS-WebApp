import { NgModule } from '@angular/core';
import { LoaderService } from 'src/app/services/loader.service';
import { LoaderInterceptor } from 'src/app/helper/loader.interceptors';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
@NgModule({
  providers: [
    LoaderService,
    { provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true
    }
  ]
})
export class LoaderModule { }

