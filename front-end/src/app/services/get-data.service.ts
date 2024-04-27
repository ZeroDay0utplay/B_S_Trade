import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../search-bar/stocks';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {
  private url = 'http://127.0.0.1:3000/stocks';

  constructor(private http: HttpClient) { }

  getData(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.url);
  }
}
