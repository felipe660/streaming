import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchesService {

  readonly BASE_URI = `http://localhost:3000/matches`;

  constructor(private http: HttpClient) { }

  // saveOrUpdate(dto: any): any {
  //   if (dto.id) {
  //       return this.http.put(`${this.BASE_URI}/${dto.id}`, dto);
  //   } else {
  //       return this.http.post(`${this.BASE_URI}`, dto);
  //   }
  // }

  getAll(): any {
    return this.http.get(`${this.BASE_URI}`);
  }

  getTournamentInfos(id: number): any {
    return this.http.get(`${this.BASE_URI}/${id}`);
  }

  finishMatch(dto: any): any{
    return this.http.post(`${this.BASE_URI}/finishmatches`, dto);
  }

  deleteMatch(id:number): any{
    return this.http.delete(`${this.BASE_URI}/${id}`);
  }

  deleteMatchFromChampionship(id:number): any{
    return this.http.delete(`${this.BASE_URI}/championshiphasmatches/${id}`);
  }
}
