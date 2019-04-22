import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

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


}
