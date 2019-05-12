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
  constructor(
    private videoService: VideoService,
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(async data => {
      console.log(data)
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


  }

  async drawLanguage() {
    await this.getCountLanguage('English');
    await this.getCountLanguage('Spanish');
    await this.getCountLanguage('Vietnamese');
    console.log(this.listVideoOfLanguage)
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

  getCountLanguage(nameLanguage) {
    return new Promise((resolve, reject) => {
      this.videoService.countVideoByLanguage(nameLanguage).subscribe(result => {
        console.log(result, nameLanguage)
        this.listVideoOfLanguage.push({
          y: result, label: nameLanguage
        })
        console.log(this.listVideoOfLanguage)
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
}
