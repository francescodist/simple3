import { Injectable } from '@angular/core';
import { TextService } from './text.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AlertService } from './alert.service';
import { LanguageService } from './language.service';
import { LoadingService } from './loading.service';
import { takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: "root"
})
export class PdfService {
    constructor(private textService: TextService, private http: HttpClient, private route: Router,
        private alert: AlertService, private languageService: LanguageService, private loadingService: LoadingService) { };

    public async getTextFromPdf(formData: FormData) {
        if (!formData.get('pdf') || formData.get('pdf') && (formData.get('pdf') as File).size === 0) {
            this.route.navigate(['tabs', 'text']);
            return;
        }
        const language = this.languageService.getSelectedLanguage() === "IT" ? "ita" : "eng";
        const cancel = await this.loadingService.startLoading({ message: this.languageService.getTemplate('pdf', 'loading') });
        this.http.post(`http://193.1.97.172/ocr/pdf/${language}`, formData).pipe(takeUntil(cancel)).subscribe(({ text }: { text: string }) => {
            this.textService.setText(text);
            this.loadingService.stopLoading();
            this.route.navigate(['tabs', 'text']);
        }, () => {
            this.loadingService.stopLoading();
            this.alert.showError('errorPdf');
            this.route.navigate(['tabs', 'text']);
        })
    }


}