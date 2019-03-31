import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { map } from 'rxjs/operators';

const URL = 'http://localhost:8081/api/video/';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  videoForm: FormGroup;
  token = ''
  nameEngine = ''
  language = 'en-US'
  hasFile: boolean = false;
  file;
  listCategory = []

  constructor(
    public videoService: VideoService,
    private categoryService: CategoryService,
    private _formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.videoForm = this._formBuilder.group({
      video: ['', Validators.required]
    });

    this.uploader.onAfterAddingFile = (file) => {
      this.file = file;
      console.log(file)
      this.hasFile = true;
      file.withCredentials = false;
      this.token = JSON.parse(localStorage.getItem('currentUser')).token || '';
      this.uploader.authToken = this.token
    }
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status !== 200) {
        alert('error upload file')
      } else {
        // this.dialogRef.close();

        let path = JSON.parse(response)
        console.log(path)
        this.videoService.pingStartEngine(this.nameEngine, this.language, path).subscribe(data => {
          // this.videosAccount = data;
          console.log('videos: ', data)
        }, err => {
          console.log(err)
        })
      }
    };

    this.categoryService.getAll().subscribe(data => {
      this.listCategory = data.map(cate => {
        return cate.category;
      })
      console.log('cate: ', this.listCategory)
    }, err => {
      console.log(err)
    })
  }



  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'video'
  });

  cancelUpload() {
    this.router.navigate(['/']);
  }

  upload() {
    this.uploader.uploadAll();
  }
}
