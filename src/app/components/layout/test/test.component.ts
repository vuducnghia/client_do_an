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
    $('.btn').button('loading');

    // $('.btn').on('click', function () {
    //   var $this = $(this);
    //   console.log($this)
    //   $this.button('loading');
    //   // setTimeout(function () {
    //   //   // $this.button('reset');
    //   // }, 8000);
    // });
  }

}


