import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  readonly BASE_URI = `http://localhost:3000/users`;

  constructor(private http: HttpClient) { }

  login(dto: any): Observable<any> {
    const queryParams = new HttpParams({ fromObject: dto });
    const url = `${this.BASE_URI}/login`; // Adapte o caminho conforme necessário
    return this.http.get(url, { params: queryParams });
}


  saveOrUpdate(dto: any): any {
    if (dto.id) {
        // return this.http.put(`${this.BASE_URI}/${dto.id}`, dto);
    } else {
        // return this.http.post(`${this.BASE_URI}`, dto);
    }
  }
}
