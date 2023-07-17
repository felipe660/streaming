import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserVideosService {

  readonly BASE_URI = `http://localhost:3000/user-video`;

  constructor(private http: HttpClient) { }

  saveOrUpdate(dto: any): any {
    if (dto.id) {
        // return this.http.put(`${this.BASE_URI}/${dto.id}`, dto);
    } else {
        return this.http.post(`${this.BASE_URI}`, dto);
    }
  }

  remove(dto: any): any {
    return this.http.delete(`${this.BASE_URI}/${dto.iduser}/${dto.idvideo}`);
  }

  get(): any {
    return this.http.get(`${this.BASE_URI}`);
  }
}