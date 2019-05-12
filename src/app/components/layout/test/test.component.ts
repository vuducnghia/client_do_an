import { Component, OnInit } from '@angular/core';
declare var $: any;

import '../../../../assets/js/videojs-transcript.js'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

}


