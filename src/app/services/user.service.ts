import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
const apiUrl = 'http://localhost:8081/api';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<User[]>(apiUrl + `/user/allUser`);
  }

  getUserById(id: number) {
    return this.http.get(apiUrl + `/user/getUserById/${id}`);
  }

  register(user) {
    return this.http.post(apiUrl + `/auth/signup`, user);
  }

  update(user) {
    // return this.http.put(`/users/` + user.id, user);
  }

  delete(id: number) {
    // return this.http.delete(`/users/` + id);
  }

  updateStatusByIdUser(idUser, status){
    return this.http.put(`${apiUrl}/user/updateStatusUser/${idUser}`, {status});
  }
}
