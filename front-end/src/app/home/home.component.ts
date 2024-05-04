import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { BACKEND_URL } from '../app.module';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(private http: HttpClient, @Inject(BACKEND_URL) private url: string){
    this.http.get(this.url + '/', { withCredentials: true }).subscribe();
  }
}
