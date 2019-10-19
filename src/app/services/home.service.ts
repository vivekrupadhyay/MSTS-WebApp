import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService{
    header: any;
  reqHeaders = new HttpHeaders({
    'Content-Type': 'text/plain',
    'Access-Control-Allow-Origin': '*'
  });
  options = { headers: this.reqHeaders };
  headerSettings: { [name: string]: string | string[]; } = {};


  constructor(private http: HttpClient) {
  }
  getBanner(): Observable<any> {
    this.header = new HttpHeaders(this.headerSettings);
    
    return this.http.get<any>('https://ltimosaicthings.azurewebsites.net/landing/landingmetadata', { headers: this.header });
  }
}