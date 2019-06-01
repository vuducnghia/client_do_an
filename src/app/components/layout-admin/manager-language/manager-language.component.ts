import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../../services/language.service';
declare var $: any;
@Component({
  selector: 'app-manager-language',
  templateUrl: './manager-language.component.html',
  styleUrls: ['./manager-language.component.scss']
})
export class ManagerLanguageComponent implements OnInit {
  // listLanguage = ['English', 'Spanish', 'Vietnamese']
  listLanguage = [];
  constructor(
    private languageService: LanguageService
  ) { }

  ngOnInit() {
    this.languageService.getAll().subscribe(async languages => {
      this.listLanguage = languages;
    })
  }

  delete(id, index) {
    console.log(id, index, this.listLanguage[index].language)
    this.languageService.deleteLanguage(id, this.listLanguage[index].language).subscribe(result => {
      this.listLanguage.splice(index, 1);
    }, error => {
      alert('do not delete the language because this language is used');
    })
  }
  updateLanguage(language) {
    let value = $("#id_" + language._id).val();
    //hardcode for 3 language
    if(['vietnamese', 'english', 'spanish', 'Vietnamese', 'English', 'Spanish'].includes(value)){
      this.languageService.updateLanguage(language._id, value).subscribe(result => {
        language.language = value
      })
    }else{
      alert('do not edit the language because this language is used');
    }
  }
  addLanguage() {
    let value = $('#NewCate').val();
    let check = false
    this.listLanguage.forEach(language => {
      if (language.language === value) {
        check = true
      }
    })

    if (!check) {
      this.languageService.addLanguage(value).subscribe(result => {
        this.listLanguage.push(result);
        $('#NewCate').val('');
      })
    }else{
      alert('language already exists');
    }
  }
}
