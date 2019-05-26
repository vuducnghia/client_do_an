import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
declare var $: any;
@Component({
  selector: 'app-manager-user',
  templateUrl: './manager-user.component.html',
  styleUrls: ['./manager-user.component.scss']
})
export class ManagerUserComponent implements OnInit {
  users = []
  constructor(
    private userService: UserService
  ) { }

  createAccountForm = new FormGroup(
    {
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
      role: new FormControl('', Validators.required)
    }
  );

  ngOnInit() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
    }, err => {
      console.log(err)
    })
  }

  changeStatus(id, status, user) {
    user.status = status
    this.userService.updateStatusByIdUser(id, status).subscribe(result => {
      console.log(result)
    }, err => {
      console.log(err)
    })
  }

  createAccount() {
    let user = {
      username: this.createAccountForm.get('username').value,
      password: this.createAccountForm.get('password').value,
      firstName: this.createAccountForm.get('firstName').value,
      lastName: this.createAccountForm.get('lastName').value,
      role: this.createAccountForm.get('role').value === 'User' ? 'user' : 'admin1',
    }
    console.log(user);

    this.userService.createAccount(user).subscribe(result => {
      console.log(result);
      $('#exampleModal').modal('hide');
      this.createAccountForm.get('username').setValue('');
      this.createAccountForm.get('password').setValue('');
      this.createAccountForm.get('firstName').setValue('');
      this.createAccountForm.get('lastName').setValue('');
      this.createAccountForm.get('role').setValue('');
      this.userService.getAll().subscribe(users => {
        this.users = users;
      }, err => {
        console.log(err)
      })
    }, err => {
      console.log(err)
    })
  }
}
