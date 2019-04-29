import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const apiUrl = "http://localhost:8081/api/video/";
// const URL = 'http://localhost:8081/api/video/';
// const currentUser = JSON.parse(localStorage.getItem('currentUser'));
// console.log(currentUser)
// console.log(typeof(currentUser))
const headers = new HttpHeaders({
  'Content-Type': 'application/json',
  // 'Authorization': currentUser.token
})

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

  getVideoByCategory(name) {
    return this.http.get<any>(`${apiUrl}getVideoByCate/${name}`);
  }

  getVideoByLanguage(name, limit) {
    return this.http.get<any>(`${apiUrl}getVideoByLanguage/${name}?limit=${limit}`);
  }

  getVideoRecent(){
    return this.http.get<any>(`${apiUrl}getVideoRecent`);
  }

  delete(id: number) {
    // return this.http.delete(`/users/` + id);
  }

  getFileTranscriptById(id, engine) {
    return this.http.get(`http://localhost:8081/api/transcript/${id}?engine=${engine}`, { responseType: 'text' });
  }

  getDataTranscriptById(path) {
    return this.http.get(`${apiUrl}transcriptData/${path}`);
  }

  getVideoByStage(name) {
    return this.http.get<any>(`${apiUrl}getVideoByStage/${name}`);
  }

  getVideoByStatus(name) {
    return this.http.get<any>(`${apiUrl}getVideosByStatus/${name}`);
  }

  updateCategoryByIdVideo(idvideo, cate) {
    return this.http.put(`${apiUrl}updateCate/${idvideo}`, { cate });
  }

  updateDetailByIdVideo(idvideo, detail) {
    return this.http.put(`${apiUrl}updateDetail/${idvideo}`, { detail });
  }

  updateStatusByIdVideo(idvideo, status) {
    return this.http.put(`${apiUrl}updateStatus/${idvideo}`, { status });
  }

  updateStageByIdVideo(idvideo, stage) {
    return this.http.put(`${apiUrl}updateStage/${idvideo}`, { stage });
  }

  searchByName(name) {
    return this.http.get<any>(`${apiUrl}findByName/${name}`);
  }

  countVideoByCateGory(nameCategory){
    return this.http.get<any>(`${apiUrl}countVideoByCateGory/${nameCategory}`);
  }
  //comment

  addCommentByIdVideo(idvideo, comment) {
    return this.http.put(`${apiUrl}addMainComment/${idvideo}`, { comment });
  }

  updateCommentById(idComment, subContent) {
    return this.http.put(`${apiUrl}updateCommentById/${idComment}`, {subContent} );
  }

  getCommentByIdVideo(idVideo) {
    return this.http.get<any>(`${apiUrl}getCommentByIdVideo/${idVideo}`);
  }

  getCommentById(idComment) {
    return this.http.get<any>(`${apiUrl}getCommentById/${idComment}`);
  }
}
