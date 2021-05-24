import { Component, ChangeDetectorRef } from "@angular/core";
import { SimpleService } from "../services/simple.service";
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ExamplesList } from './examples/examples';
import { LanguageService } from '../services/language.service';
import { LoadingService } from '../services/loading.service';
import { TextService } from '../services/text.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../services/alert.service';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: "app-text",
  templateUrl: "text.page.html",
  styleUrls: ["text.page.scss"]
})
export class TextPage {
  public popover;
  private shouldScroll = true;
  constructor(private popoverCtrl: PopoverController, private simpleService: SimpleService,
    private router: Router, private languageService: LanguageService, private cd: ChangeDetectorRef,
    private loadingService: LoadingService, private textService: TextService, private http: HttpClient,
    private alertService: AlertService) { }

  public async simplifyText() {
    const cancel = await this.loadingService.startLoading({ message: this.getTemplate('simplifying') });
    this.simpleService.getSimplifiedText().pipe(takeUntil(cancel)).subscribe(result => {
      if (result && result[0] && result[0].contenuto) {
        this.simpleService.setResult(result);
        setTimeout(() => {
          this.router.navigate(['simplified-text']);
        }, 0)
      } else {
        this.alertService.showError('noResultSimplify');
      }
    }, e => {
      this.alertService.showError('errorSimplify');
    }).add(() => this.loadingService.stopLoading());
  }

  public ionViewWillLeave() {
    this.cd.detach();
  }

  public ionViewWillEnter() {
    this.cd.reattach();
  }

  public changeLanguage() {
    this.languageService.selectNextLanguage();
  }

  public getSelectedLanguage() {
    return this.languageService.getSelectedLanguage();
  }

  public clearText() {
    this.textService.setText('')
  }

  public async getExampleText() {
    const lang = this.languageService.getSelectedLanguage() === "IT" ? "ita/" : "";
    const cancel = await this.loadingService.startLoading({ message: this.languageService.getTemplate('examples', 'loading') })
    const res = await this.http.get<any>(`http://193.1.97.172/simplehealth/simple3/service/report/${lang}?type=json`).pipe(takeUntil(cancel)).toPromise();
    this.loadingService.stopLoading();
    const popover = await this.popoverCtrl.create({
      component: ExamplesList,
      componentProps: { examples: res[0].contents }
    });
    await popover.present();
    const { data } = await popover.onDidDismiss()
    if (!data) return;
    this.setText(data.Text || '');
  }

  public getTemplate(key: string): string {
    return this.languageService.getTemplate('text', key)
  }

  public getText() {
    return this.textService.getText();
  }

  public setText(newText) {
    this.textService.setText(newText);
  }

  public onTextChange(event: Event) {
    this.setText((event.target as HTMLTextAreaElement).value);
  }


  public offsetScroll(e: any) {
    const { offsetY } = e;
    const textarea = document.getElementsByTagName('textarea')[0];

    setTimeout(() => {
      if (this.shouldScroll) {
        const { offsetHeight } = textarea;
        const { lineHeight } = window.getComputedStyle(textarea);
        const lines = Math.ceil(offsetY / parseInt(lineHeight));
        const cursorPosition = lines * parseInt(lineHeight);
        textarea.scrollTop = cursorPosition > offsetHeight ? cursorPosition - offsetHeight + textarea.scrollTop : textarea.scrollTop;
        this.shouldScroll = false;
      }
    }, 200)
  }

  public enableOffsetScroll() {
    this.shouldScroll = true;
  }
}
