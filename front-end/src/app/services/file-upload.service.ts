import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_URL } from '../app.module';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private http: HttpClient, @Inject(BACKEND_URL) private url: string) { }

  upload(file: File, id: string): Observable<HttpEvent<any>> {
    console.log(`${this.url}/profile/${id}`);
    const formData: FormData = new FormData();

    formData.append('file', file);
    const req = new HttpRequest('PUT', `${this.url}/profile/${id}`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
