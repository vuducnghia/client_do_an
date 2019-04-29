import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as CanvasJS from '../../../../assets/js/canvasjs.min';
@Component({
  selector: 'app-test-admin',
  templateUrl: './test-admin.component.html',
  styleUrls: ['./test-admin.component.scss']
})
export class TestAdminComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Basic Column Chart in Angular"
      },
      data: [{
        type: "column",
        dataPoints: [
          { y: 71, label: "Apple" },
          { y: 55, label: "Mango" },
          { y: 50, label: "Orange" },
          { y: 65, label: "Banana" },
          { y: 95, label: "Pineapple" },
          { y: 68, label: "Pears" },
          { y: 28, label: "Grapes" },
          { y: 34, label: "Lychee" },
          { y: 14, label: "Jackfruit" }
        ]
      }]
    });
      
    chart.render();
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
