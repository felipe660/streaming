import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChampionshiphasteamsService {

  readonly BASE_URI = `http://localhost:3000/results`;

  constructor(private http: HttpClient) { }

  putResults(dto:any): any {
    console.log(dto);
    return this.http.post(`${this.BASE_URI}/${dto.id_team}`, dto);
  }

  registerTeam(dto: any): any {
    console.log(dto)
    return this.http.post(`${this.BASE_URI}`, dto);
  }

  allResults(): any{
    return this.http.get(`${this.BASE_URI}`);
  }

  getTeamInfo(id: any): any {
    return this.http.get(`${this.BASE_URI}/${id}`);
  }
}
