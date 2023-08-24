import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChampionsService {
  readonly BASE_URI = `http://localhost:3000/champions`;

  constructor(private http: HttpClient) { }

  getAll(): any {
    return this.http.get(`${this.BASE_URI}`);
  }
}
