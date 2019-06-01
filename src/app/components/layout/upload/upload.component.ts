import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('myInput') myInput: ElementRef;

  videoForm: FormGroup;
  // token = '';
  nameEngine = '';
  language = '';
  category = '';
  hasFile: boolean = false;
  file;
  listCategory = [];
  listEngineTranscript = [];
  listLanguage = [];
  isUpload: boolean = false;
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
    this.isUpload = true;
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      if (status !== 200) {
        document.getElementById("progressBar").style.backgroundColor = "red";
        alert('error upload file');
      } else {
        document.getElementById("progressBar").style.width = "100%";
        let result = JSON.parse(response);
        setTimeout(() => {
          this.router.navigate(['/']);
        }, 8000);

        this.engineService.startEngine(this.nameEngine, this.language, result.id).subscribe(data => {
          // this.videosAccount = data;
          console.log('videos: ', data)
        }, err => {
          console.log(err)
        })

        this.videoService.updateCategoryByIdVideo(result.id, this.category).subscribe(data => {
          // this.videosAccount = data;
          console.log('videos: ', data)
        }, err => {
          console.log(err)
        })

        if (this.myInput.nativeElement.value != null) {
          this.videoService.updateDetailByIdVideo(result.id, this.myInput.nativeElement.value).subscribe(data => {
          }, err => {
            console.log(err)
          })
        }
      }
    };
  }

  onChangeEngine(nameEngine) {
    this.nameEngine = nameEngine
    console.log('listEngineTranscript', this.listEngineTranscript)
    let x: any = this.listEngineTranscript.filter(engine => {
      return engine.name === nameEngine
    })
    this.listLanguage = x[0].language;
  }

  onChangeLanguage(language) {
    this.language = language
  }

  onChangeCategory(category) {
    this.category = category;
  }
}
