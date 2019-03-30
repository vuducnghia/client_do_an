import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormGroupDirective } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { first } from 'rxjs/operators';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
  }

  isLogin: boolean = false;
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
  ngOnInit() {
  }

  showModelLogin() {
    $('#signupModal').modal('hide');
    $('#loginModal').modal('show');
  }

  showModelSignUp() {
    $('#signupModal').modal('show');
    $('#loginModal').modal('hide');
  }

  login(): void {
    let user = {
      username: this.signInForm.get('username').value,
      password: this.signInForm.get('password').value
    }

    this.authService.loginUser(user)
      .pipe(first())
      .subscribe(data => {
        console.log(data)
        this.isLogin = true;
        $('#loginModal').modal('hide');
        // if (this.authService.currentUserValue.role ==='user') {
        //   console.log('login success')
        //   // this.router.navigate([`/home/${this.authService.currentUserValue.id}`]);
        // }
      }, error => {
        console.log(JSON.stringify(error))
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
    console.log(111)
    console.log(this.authService.currentUserValue)
    if (this.authService.currentUserValue) {
      this.router.navigate(['/upload']);
    }
    else {
      this.showModelLogin();
    }
  }
}

function passwordMatchValidator(g: FormGroup) {
  const password = g.get('password').value;
  const confirmPassword = g.get('confirmPassword').value;
  return password === confirmPassword ? null : { mismatch: true };
}
