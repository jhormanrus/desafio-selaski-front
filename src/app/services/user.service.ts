import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<User[]> {
    const endpoint = `${environment.apiUrl}/users`;
    return this.http.get<User[]>(endpoint);
  }

  getById(id: number): Observable<User> {
    const endpoint = `${environment.apiUrl}/users/${id}`;
    return this.http.get<User>(endpoint);
  }
}
