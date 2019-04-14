import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-test-admin',
  templateUrl: './test-admin.component.html',
  styleUrls: ['./test-admin.component.scss']
})
export class TestAdminComponent implements OnInit {

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
