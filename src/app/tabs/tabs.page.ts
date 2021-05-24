import { Component, ɵɵresolveBody, NgZone } from '@angular/core';
import { LanguageService, LanguageTemplateKey } from '../services/language.service';
import { PdfService } from '../services/pdf.service';
import { runInThisContext } from 'vm';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(private languageService: LanguageService, private pdfService: PdfService, private zone: NgZone) { }

  getTitle(page: LanguageTemplateKey): string {
    return this.languageService.getTemplate(page, 'title')
  }

  public getTextFromPdf(event: Event) {
    //@ts-ignore
    const formData = new FormData(event.target);
    this.pdfService.getTextFromPdf(formData);
    return;
  }

  public submit() {
    document.getElementById('pdfSubmit').click();
  }

  getTemplate(key: string): string {
    return this.languageService.getTemplate('pdf', key);
  }

  selectPdf(e: Event) {
    e.stopImmediatePropagation();
    e.stopPropagation();
    e.preventDefault();
    const pdfInput = document.getElementById('pdfInput') as HTMLInputElement
    pdfInput.value = "";
    pdfInput.click();

  }

  blur(e: Event) {
    (e.target as HTMLElement).blur();
  }

}
