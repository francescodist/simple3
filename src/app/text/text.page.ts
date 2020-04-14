import { Component, ChangeDetectorRef } from "@angular/core";
import { SimpleService } from "../services/simple.service";
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ExamplesList } from './examples/examples';
import { LanguageService } from '../services/language.service';
import { LoadingService } from '../services/loading.service';
import { TextService } from '../services/text.service';

@Component({
  selector: "app-text",
  templateUrl: "text.page.html",
  styleUrls: ["text.page.scss"]
})
export class TextPage {
  public popover;
  constructor(private popoverCtrl: PopoverController, private simpleService: SimpleService,
    private router: Router, private languageService: LanguageService, private cd: ChangeDetectorRef,
    private loadingService: LoadingService, private textService: TextService) { }

  public simplifyText() {
    this.loadingService.startLoading({ message: this.getTemplate('simplifying') });
    this.simpleService.getSimplifiedText().subscribe(result => {
      this.simpleService.setResult(result);
      setTimeout(() => {
        this.router.navigate(['simplified-text']);
      }, 0)
    }, () => {
      //FOR TEST PURPOSES
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
    const popover = await this.popoverCtrl.create({
      component: ExamplesList
    });
    await popover.present();
    const { data } = await popover.onDidDismiss()
    if (!data) return;
    this.loadingService.startLoading({ message: this.languageService.getTemplate('examples', 'loading') })
    this.simpleService.getExampleText(data).subscribe(text => {
      this.setText(text || '');
    }).add(() => (this.loadingService.stopLoading()));
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
}
