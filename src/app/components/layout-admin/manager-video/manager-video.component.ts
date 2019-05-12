import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
declare var $: any;
@Component({
  selector: 'app-manager-video',
  templateUrl: './manager-video.component.html',
  styleUrls: ['./manager-video.component.scss']
})
export class ManagerVideoComponent implements OnInit {
  searchText;
  listCategory = []
  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.categoryService.getAll().subscribe(async categorys => {
      this.listCategory = categorys;
      console.log(this.listCategory)
    })
  }

  updateCategory(cate){
    let value = $("#id_"+cate._id).val();
    this.categoryService.updateCategory(cate._id, value).subscribe(result=>{
      console.log(result);
      cate.category = value
    })
  }
}
