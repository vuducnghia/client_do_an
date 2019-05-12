import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { first } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import { VideoService } from '../../../services/video.service';
declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private videoService: VideoService
  ) {
  }
  videos = [];
  isLogin: boolean = false;
  isErrorLogin: boolean = false;
  currentUser = {};
  signupForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    passwordMatchValidator
  );

  signInForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }
  );

  searchForm = new FormGroup(
    {
      nameVideo: new FormControl('', [Validators.required])
    }
  )

  ngOnInit() {

    if (this.authService.currentUserValue) {
      console.log(this.authService.currentUserValue)
      this.currentUser = this.authService.currentUserValue;
      this.isLogin = true;
    } else {
      this.isLogin = false;
    }

    $('.toggle-register').click(function(){
      $(this).addClass('active');
      $('.toggle-login').removeClass('active');
      $('.login-body').slideUp("slow");
      $('.register-body').delay(625).slideDown("slow");
    });
    
    $('.toggle-login').click(function(){
      $(this).addClass('active');
      $('.toggle-register').removeClass('active');
      $('.register-body').slideUp("slow");
      $('.login-body').delay(625).slideDown("slow");
    });
    
    $('#registered').click(function(){
      $('.toggle-login').click();
    });
  }

  login(): void {
    let user = {
      username: this.signInForm.get('username').value,
      password: this.signInForm.get('password').value
    }

    this.authService.loginUser(user)
      .pipe(first())
      .subscribe(data => {
        this.isLogin = true;
        this.isErrorLogin = false;
        this.currentUser = data
        $('#loginModal').modal('hide');
      }, error => {
        console.log(JSON.stringify(error))
        this.isErrorLogin = true;
      })
  }

  logout(): void {
    this.isLogin = false
    this.authService.logout();
  }

  signup(): void {
    let user = {
      username: this.signupForm.get('username').value,
      password: this.signupForm.get('password').value,
      firstName: this.signupForm.get('firstName').value,
      lastName: this.signupForm.get('lastName').value,
      email: this.signupForm.get('email').value,
    }

    console.log(user)
    this.userService.register(user)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data)

        }, error => {
          console.log(error)
        })
  }

  gotoUpload() {
    if (this.authService.currentUserValue) {
      this.router.navigate(['/upload']);
    }
    else {
      $('#loginModal').modal('show');
    }
  }

  search() {
    if (!this.searchForm.get('nameVideo').value) {
      document.getElementById("results").style.display = 'none';
    } else {
      document.getElementById("results").style.display = 'block'
      this.videoService.searchByName(this.searchForm.get('nameVideo').value).subscribe(
        videos => {
          this.videos = videos;
        }, error => {
          console.log(error)
        })
    }
  }

  reset() {
    document.getElementById("results").style.display = 'none';
    this.searchForm.setValue({ nameVideo: '' })
  }

  showDetailUser() {
    let parent = document.querySelector(".menu-container");
    
    if (parent.classList.contains("open")) {
      parent.classList.remove("open");
    } else {
      parent.classList.add("open");
    }
  }
}

function passwordMatchValidator(g: FormGroup) {
  const password = g.get('password').value;
  const confirmPassword = g.get('confirmPassword').value;
  return password === confirmPassword ? null : { mismatch: true };
}
