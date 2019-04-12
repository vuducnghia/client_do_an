import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8081/api/video/";
// const URL = 'http://localhost:8081/api/video/';
// const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// console.log(currentUser)
// console.log(typeof(currentUser))
// const headers = new HttpHeaders({
//   'Content-Type': 'application/json',
//   // 'Authorization': currentUser.token
// })

// const headerUpload = new HttpHeaders({
//   'Content-Type': 'multipart/form-data',
//   // 'Authorization': currentUser.token
// })

@Injectable()
export class VideoService {
  constructor(private http: HttpClient) {
  }

  getVideoByUser() {
    return this.http.get<any>(`${apiUrl}`);
  }

  getVideoById(id: number) {
    return this.http.get(`${apiUrl}` + id);
  }

  getVideoByCategory(name){
    return this.http.get<any>(`${apiUrl}getVideoByCate/${name}`);
  }
  delete(id: number) {
    // return this.http.delete(`/users/` + id);
  }

  getFileTranscriptById(id, engine) {
    return this.http.get(`http://localhost:8081/api/transcript/${id}?engine=${engine}`, {responseType: 'text'});
  }

  getDataTranscriptById(id, engine) {
    return this.http.get(`${apiUrl}transcriptData/${id}?engine=${engine}`);
  }

  getVideoByStage(name){
    return this.http.get<any>(`${apiUrl}getVideoByStage/${name}`);
  }

  updateCategoryByIdVideo(idvideo, cate){
    return this.http.put(`${apiUrl}updateCate/${idvideo}`, cate);
  }

  updateStatusByIdVideo(idvideo, status){
    return this.http.put(`${apiUrl}updateStatus/${idvideo}`, status);
  }

  updateStageByIdVideo(idvideo, stage){
    return this.http.put(`${apiUrl}updateStage/${idvideo}`, stage);
  }
}
