import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload/ng2-file-upload';
declare var $: any;
const URL = 'http://localhost:8081/api/user/avatar';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isError: boolean=false;
  user = {};
  userForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      // oldPassword: new FormControl(''),
      // confirmPassword: new FormControl('')
    },
    // passwordMatchValidator
  );
  avatarForm: FormGroup;
  file;
  disableButton: boolean = true;
  isUpdateSuccess:boolean=false;
  constructor(
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.userService.getUserById(this.authService.currentUserValue.id).subscribe((user: any) => {
      console.log(user)
      this.userForm.setValue({
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        password: '',
        // currentPassword:'',
        // confirmPassword:''
      })
      this.userForm.valueChanges.subscribe(changes => this.disableButton = false);
    })
    this.avatarForm = this._formBuilder.group({
      avatar: ['', Validators.required]
    });
    this.init();

    this.uploader.onAfterAddingFile = (file) => {
      // console.log(file)
      this.file = file;
      file.withCredentials = false;
      this.uploader.authToken = JSON.parse(localStorage.getItem('currentUser')).token || '';
    }
  }

  init() {
    let readURL = function (input) {
      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e: any) {
          $('.profile-pic').attr('src', e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
      }
    }

    $(".file-upload").on('change', function () {
      readURL(this);
    });

    $(".upload-button").on('click', function () {
      $(".file-upload").click();
    });
  }

  public uploader: FileUploader = new FileUploader({
    url: URL,
    itemAlias: 'avatar'
  });

  updateMe() {
    console.log(this.disableButton)
    let user = {
      username: this.userForm.get('username').value,
      password: this.userForm.get('password').value,
      firstName: this.userForm.get('firstName').value,
      lastName: this.userForm.get('lastName').value,
    }
    if (user.password) {
      this.userService.updateProfileUser(user).subscribe(result => {
        this.isUpdateSuccess = true;
      })
    }
    if (this.file) {
      this.uploader.uploadAll();
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        if (status !== 200) {
          this.isError = true;
          // alert('error upload file');
        } else {
          this.isUpdateSuccess = true;
          // console.log('upload success');
        }
      }
    }

  }
}

function passwordMatchValidator(g: FormGroup) {
  const password = g.get('password').value;
  const confirmPassword = g.get('confirmPassword').value;
  return password === confirmPassword ? null : { mismatch: true };
}