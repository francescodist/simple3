import { Component, OnInit } from '@angular/core';
import { SimplifiedResult, SimplifiedTerm } from '../models/simplified-term';
import { SimpleService } from '../services/simple.service';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-simplified-text',
  templateUrl: './simplified-text.page.html',
  styleUrls: ['./simplified-text.page.scss'],
})
export class SimplifiedTextPage implements OnInit {

  public result: SimplifiedTerm[];

  constructor(private simpleService: SimpleService, private languageService: LanguageService) { }

  ngOnInit() {
    this.result = this.simpleService.getResult();
  }

  getTemplate(key: string): string {
    return this.languageService.getTemplate('simplifiedText', key);
  }

  public getDecodedText(text: string): string {
    return text.replace("%0A ", "\n");
  }

}
