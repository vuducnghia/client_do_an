import { Component, OnInit } from '@angular/core';
import * as CanvasJS from '../../../../assets/js/canvasjs.min';
import { VideoService } from '../../../services/video.service';
import { CategoryService } from '../../../services/category.service';
@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {
  listVideoOfCategory = [];
  listVideoOfLanguage = [];
  listVideoStatus = [];
  constructor(
    private videoService: VideoService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(async data => {
      for (let i = 0; i < data.length; ++i) {
        let x = await this.getCountCategory(data[i].category)

      }
      let chart2 = new CanvasJS.Chart("chartContainer2", {
        theme: "light2",
        animationEnabled: true,
        exportEnabled: true,
        title: {
          text: "Videos/Category"
        },
        data: [{
          type: "pie",
          showInLegend: true,
          toolTipContent: "<b>{name}</b>: ${y} (#percent%)",
          indexLabel: "{name} - #percent%",
          dataPoints: this.listVideoOfCategory
        }]
      });

      chart2.render();
    })

    this.drawLanguage()
    this.drawStatus()

  }

  async drawLanguage() {
    await this.getCountLanguage('English');
    await this.getCountLanguage('Spanish');
    await this.getCountLanguage('Vietnamese');
    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Videos/Language"
      },
      data: [{
        type: "column",
        dataPoints: this.listVideoOfLanguage
      }]
    });

    chart.render();
  }

  async drawStatus() {
    await this.getCountStatus('private');
    await this.getCountStatus('public');
    await this.getCountStatus('processing');
    await this.getCountStatus('requesting');
    await this.getCountStatus('reject');
    console.log(this.listVideoStatus)
    let chart = new CanvasJS.Chart("chartContainer3", {
      animationEnabled: true,
      exportEnabled: true,
      title: {
        text: "Videos/Status"
      },
      data: [{
        type: "column",
        dataPoints: this.listVideoStatus
      }]
    });

    chart.render();
  }

  getCountLanguage(nameLanguage) {
    return new Promise((resolve, reject) => {
      this.videoService.countVideoByLanguage(nameLanguage).subscribe(result => {
        this.listVideoOfLanguage.push({
          y: result, label: nameLanguage
        })
        resolve();
      })
    })
  }

  getCountCategory(nameCate) {
    return new Promise((resolve, reject) => {
      this.videoService.countVideoByCateGory(nameCate).subscribe(result => {
        this.listVideoOfCategory.push({
          y: result, name: nameCate
        })
        resolve();
      })
    })
  }

  getCountStatus(status) {
    return new Promise((resolve, reject) => {
      this.videoService.countVideoByStatus(status).subscribe(result => {
        console.log(result, status)
        this.listVideoStatus.push({
          y: result, label: status
        })
        resolve();
      })
    })
  }
}
