import { Component, OnInit } from '@angular/core';


declare const videojs: any
import '../../../../assets/js/videojs-transcript.js'

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  data = {
    logs: [
      {
        title: 'John Doe',
        time: '14.12.2018 13:05',
        content: 'Lorem ipsum, dolor sit amet consectetur adipisicing.',
        avatar: 'https://picsum.photos/400/400?image=1074',
        type: 'primary'
      },
      {
        title: 'Jane Doe',
        time: '14.12.2018 13:05',
        content: 'Soluta perferendis, explicabo fuga amet sit ab!',
        avatar: 'https://picsum.photos/400/400?image=1027',
        type: 'secondary'
      },
      {
        title: 'Mark Doe',
        time: '14.12.2018 13:05',
        content: 'Sit quod tempora optio magnam autem. Possimus?',
        avatar: 'https://picsum.photos/400/400?image=1010',
        type: 'secondary'
      },
    ]
  };
  constructor() { }

  ngOnInit() {


    // this.data = 

    // document.getElementById('template').innerHTML = output;
  }

}


