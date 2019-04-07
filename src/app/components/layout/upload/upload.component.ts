import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../../services/video.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';
import { Router } from '@angular/router';
import { CategoryService } from '../../../services/category.service';
import { map } from 'rxjs/operators';
import { EngineService } from 'src/app/services/engine.service';

const URL = 'http://localhost:8081/api/video/';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  videoForm: FormGroup;
  // token = '';
  nameEngine = '';
  language = '';
  category= '';
  hasFile: boolean = false;
  file;
  listCategory = [];
  listEngineTranscript = [];
  listLanguage = [];
  constructor(
    public videoService: VideoService,
    private categoryService: CategoryService,
    private engineService: EngineService,
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
      // this.token = JSON.parse(localStorage.getItem('currentUser')).token || '';
      // this.uploader.authToken = this.token
    }


    this.categoryService.getAll().subscribe(data => {
      this.listCategory = data.map(cate => {
        return cate.category;
      })
    }, err => {
      console.log(err)
    })

    this.engineService.getEngineByTranscript().subscribe(data => {
      this.listEngineTranscript = data;
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

  async upload() {
    this.uploader.uploadAll();
    // this.videoService.createEngine(this.nameEngine, this.language)
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status !== 200) {
        alert('error upload file')
      } else {
        // this.dialogRef.close();

        let result = JSON.parse(response)
        console.log(result)
        this.engineService.startEngine(this.nameEngine, this.language, result.path).subscribe(data => {
          // this.videosAccount = data;
          console.log('videos: ', data)
        }, err => {
          console.log(err)
        })

        this.videoService.updateCategoryByIdVideo(result.id, {nameCate:this.category}).subscribe(data => {
          // this.videosAccount = data;
          console.log('videos: ', data)
        }, err => {
          console.log(err)
        })
      }
    };




  }

  onChangeEngine(nameEngine) {
    this.nameEngine = nameEngine
    let x: any = this.listEngineTranscript.filter(engine => {
      return engine.name === nameEngine
    })
    this.listLanguage = x[0].language;
  }

  onChangeLanguage(language) {
    this.language = language
  }

  onChangeCategory(category){
    this.category = category;
  }
}
