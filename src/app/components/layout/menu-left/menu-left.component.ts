import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { AuthService } from '../../../services/auth.service';
declare var $: any;
@Component({
  selector: 'app-menu-left',
  templateUrl: './menu-left.component.html',
  styleUrls: ['./menu-left.component.scss']
})
export class MenuLeftComponent implements OnInit {
  listCategory = [];
  isLogin: boolean = false;
  constructor(
    private categoryService: CategoryService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    if (this.authService.currentUserValue) {
      this.isLogin = true;
    }
    this.categoryService.getAll().subscribe(data => {
      this.listCategory = data.map(cate => {
        return cate.category;
      })
    })
  }
  showCategory() {
    $("ul.cl-effect-2").slideToggle(300);
  }
  showLanguage(){
    $("ul.cl-effect-1").slideToggle(300)
  }
}
