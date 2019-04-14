import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-layout-admin',
  templateUrl: './layout-admin.component.html',
  styleUrls: ['./layout-admin.component.scss']
})
export class LayoutAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    $('#menu-action').click(function() {
      $('.sidebar').toggleClass('active');
      $('.main').toggleClass('active');
      $(this).toggleClass('active');
    
      if ($('.sidebar').hasClass('active')) {
        $(this).find('i').addClass('fa-close');
        $(this).find('i').removeClass('fa-bars');
      } else {
        $(this).find('i').addClass('fa-bars');
        $(this).find('i').removeClass('fa-close');
      }
    });
    
    // Add hover feedback on menu
    $('#menu-action').hover(function() {
        $('.sidebar').toggleClass('hovered');
    });
  }

}
