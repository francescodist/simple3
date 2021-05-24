import { Component } from '@angular/core';
import { LanguageService } from '../services/language.service';
import { PdfService } from '../services/pdf.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-pdf',
    templateUrl: 'pdf.page.html',
})
export class PdfPage {

    shouldSubmit = false;

    constructor(private languageService: LanguageService, private pdfService: PdfService, private route: Router) { }

    ionViewDidEnter() {

        setTimeout(() => {
            this.route.navigate(['tabs', 'text'])
            const pdfInput = document.getElementById('pdfInput') as HTMLInputElement
            pdfInput.value = "";
            pdfInput.click();
        }, 0)

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

}
