import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manager-language',
  templateUrl: './manager-language.component.html',
  styleUrls: ['./manager-language.component.scss']
})
export class ManagerLanguageComponent implements OnInit {
  listLanguage = ['English', 'Spanish', 'Vietnamese']
  constructor() { }

  ngOnInit() {
  }

  delete() {
    alert('The current system only supports 3 languages. This feature is blocked');
  }
  updateCategory() {
    alert('The current system only supports 3 languages. This feature is blocked');
  }
  addCategory() {
    alert('The current system only supports 3 languages. This feature is blocked');
  }
}
