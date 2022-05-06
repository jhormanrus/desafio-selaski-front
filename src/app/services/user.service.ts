import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { Jwt } from '../models/user-login';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<Jwt> {
    return this.http.get<Jwt>(`${environment.apiUrl}/users/login?email=${email}&password=${password}`);
  }

  getAll(): Observable<User[]> {
    const endpoint = `${environment.apiUrl}/users`;
    return this.http.get<User[]>(endpoint);
  }

  getById(id: number): Observable<User> {
    const endpoint = `${environment.apiUrl}/users/${id}`;
    return this.http.get<User>(endpoint);
  }
}
