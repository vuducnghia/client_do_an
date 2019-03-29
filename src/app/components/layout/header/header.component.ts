import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, FormGroupDirective} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() {
  }


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
}

function passwordMatchValidator(g: FormGroup) {
  const password = g.get('password').value;
  const confirmPassword = g.get('confirmPassword').value;
  return password === confirmPassword ? null : {mismatch: true};
}
