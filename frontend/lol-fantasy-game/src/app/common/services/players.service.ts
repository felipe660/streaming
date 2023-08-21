import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  readonly BASE_URI = `http://localhost:3000/player`;

  constructor(private http: HttpClient) { }

  getPlayers(id: any): any {
    return this.http.get(`${this.BASE_URI}/${id}`);
  }
}
