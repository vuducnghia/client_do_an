import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
const apiUrl = "http://localhost:8081/api/admin/";

@Injectable()
export class AdminService {
  constructor(private http: HttpClient) {
  }

  ping() {
    return this.http.get<any>(`${apiUrl}`);
  }
}