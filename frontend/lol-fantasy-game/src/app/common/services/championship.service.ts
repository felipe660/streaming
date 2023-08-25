import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChampionshipService {

  readonly BASE_URI = `http://localhost:3000/championship`;

  constructor(private http: HttpClient) { }

  getAll(id: any): any {
    return this.http.get(`${this.BASE_URI}/${id}`);
  }

  getByUserId(id: any): any {
    return this.http.get(`${this.BASE_URI}/${id}`);
  }

  saveOrUpdate(dto: any): any {
      return this.http.post(`${this.BASE_URI}`, dto);
  }
}
