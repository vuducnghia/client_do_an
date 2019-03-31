import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const apiUrl = 'http://localhost:8081/api/category';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${apiUrl}`);
  }
}