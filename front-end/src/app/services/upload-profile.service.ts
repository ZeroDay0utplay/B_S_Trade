import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BACKEND_URL } from '../app.module';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadProfileService {

  constructor(private http: HttpClient, @Inject(BACKEND_URL) private url: string) { }

  update(file: any, id: string): Observable<any>{
    const formData: FormData = new FormData();

    formData.append('file', file);
    const req = new HttpRequest('PUT', `${this.url}/profile/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}

