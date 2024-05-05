import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../Interfaces/stocks';
import { BACKEND_URL } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private http: HttpClient, @Inject(BACKEND_URL) private url: string) { }

  getData(route: string): Observable<any> {
    return this.http.get(this.url + route);
  }
}
