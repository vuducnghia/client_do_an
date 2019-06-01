import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const apiUrl = 'http://localhost:8081/api/language';

@Injectable()
export class LanguageService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${apiUrl}`);
  }

  updateLanguage(idLanguage, language) {
    return this.http.put(`${apiUrl}/updateLanguage/${idLanguage}`, { language });
  }

  deleteLanguage(idLanguage, nameLanguage) {
    return this.http.delete(`${apiUrl}/${idLanguage}/${nameLanguage}`);
  }

  addLanguage(language) {
    return this.http.post(`${apiUrl}`, { language });
  }
}