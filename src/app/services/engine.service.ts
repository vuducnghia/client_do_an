import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const apiUrl = 'http://localhost:8081/api/engine';

@Injectable()
export class EngineService {
  constructor(private http: HttpClient) { }

  getAll() {
    return this.http.get<any>(`${apiUrl}`);
  }

  getEngineByTranslate(){
    return this.http.get<any>(`${apiUrl}/translate`);
  }

  getEngineByTranscript(){
    return this.http.get<any>(`${apiUrl}/transcript`);
  }

  startEngine(nameEngine, language, idVideo){
    return this.http.post(`${apiUrl}/startEngine/${nameEngine}/${language}`, {idVideo});
  }

  translateEngine(nameEngine, language, idVideo){
    return this.http.post(`${apiUrl}/translateEngine/${nameEngine}/${language}`, {idVideo});
  }
}