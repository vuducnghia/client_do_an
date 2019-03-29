import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
const apiUrl = 'http://localhost:8081/api';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    // return this.http.get<User[]>(`/users`);
  }

  getById(id: number) {
    // return this.http.get(`/users/` + id);
  }

  register(user) {
    return this.http.post(`/api/auth/signup`, user);
  }

  update(user) {
    // return this.http.put(`/users/` + user.id, user);
  }

  delete(id: number) {
    // return this.http.delete(`/users/` + id);
  }
}
