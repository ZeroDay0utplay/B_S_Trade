import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../env';

@Injectable({
  providedIn: 'root'
})
export class GetStockDataService{

  constructor(
    private http: HttpClient
  ) { }

  getData(route: string): Observable<any> {
    const httpOptions = {
      withCredentials: true,
      headers: new HttpHeaders({
      }),
    };
    return this.http.get(environment.fastapiUrl + route, httpOptions);
  }

}
