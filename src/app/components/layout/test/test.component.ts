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

    $(document).ready(function () {

      var readURL = function (input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();

          reader.onload = function (e) {
            // $('.profile-pic').attr('src', e.target.result);
          }

          reader.readAsDataURL(input.files[0]);
        }
      }

      $(".file-upload").on('change', function () {
        readURL(this);
      });

      $(".upload-button").on('click', function () {
        $(".file-upload").click();
      });
    });
  }

}


