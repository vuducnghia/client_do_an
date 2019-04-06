import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent implements OnInit {

  constructor(private adminService:AdminService) { }

  ngOnInit() {
    this.adminService.ping().subscribe(data => {
      console.log(data)
    }, err => {
      console.log(err)
    })
  }

}
