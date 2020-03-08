import { Component } from '@angular/core';
import { LanguageService, LanguageTemplateKey } from '../services/language.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private languageService: LanguageService) {}

  getTitle(page: LanguageTemplateKey): string {
    return this.languageService.getTemplate(page, 'title')
  }

}
