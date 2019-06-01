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
    })
  }

  updateCategory(cate) {
    let value = $("#id_" + cate._id).val();
    this.categoryService.updateCategory(cate._id, value).subscribe(result => {
      cate.category = value
    })
  }

  delete(id, index) {
    this.categoryService.deleteCategory(id, this.listCategory[index].category).subscribe(result => {
      this.listCategory.splice(index, 1);
    }, error => {
      alert('do not delete the category because this category is used');
    })
  }

  addCategory() {
    let value = $('#NewCate').val();
    let check = false;
    this.listCategory.forEach(category => {
      if (category.category === value) {
        check = true
      }
    })
    if (!check) {
      this.categoryService.addCategory(value).subscribe(result => {
        this.listCategory.push(result);
        $('#NewCate').val('');
      })
    } else {
      alert('category already exists');
    }
  }
}
