import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { BACKEND_URL } from '../app.module';
import { Observable } from 'rxjs';
import { User } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class PostDataService {

  constructor(private http: HttpClient, @Inject(BACKEND_URL) private url: string) { }
  
  postData(route: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.url + route, body).subscribe(
        response => {
          resolve(response);
        },
        error => {
          reject(error);
        }
      );
    });
  }  
}
