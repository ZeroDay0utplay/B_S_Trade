import { HttpClient, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BACKEND_URL } from '../app.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  constructor(private http: HttpClient, @Inject(BACKEND_URL) private url: string) { }

  update(data: any, route: string): Observable<any>{
    const req = new HttpRequest('PUT', `${this.url}${route}`, data, {
      reportProgress: true,
      responseType: 'json',
      withCredentials: true
    });

    return this.http.request(req);
  }
}
