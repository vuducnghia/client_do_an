import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss']
})
export class LoginAdminComponent implements OnInit {
  messageError = '';
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  signInForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    }
  );

  login(): void {
    let user = {
      username: this.signInForm.get('username').value,
      password: this.signInForm.get('password').value
    }

    this.authService.loginAdmin(user)
      .pipe(first())
      .subscribe(data => {
        console.log(data)
        if (data.role === 'admin1') {
          this.router.navigate(['/admin']);
        } else if (data.role === 'admin2') {
          this.router.navigate(['/admin/manage-users']);
        }
      }, error => {
        console.log(error)
        this.messageError = error
      })
  }
}
