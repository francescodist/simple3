import { Component, ChangeDetectorRef } from "@angular/core";
import { SimpleService } from "../services/simple.service";
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ExamplesList } from './examples/examples';
import { LanguageService } from '../services/language.service';
import { LoadingService } from '../services/loading.service';

@Component({
  selector: "app-text",
  templateUrl: "text.page.html",
  styleUrls: ["text.page.scss"]
})
export class TextPage {
  public text = "";
  public popover;
  constructor(private popoverCtrl: PopoverController,private simpleService: SimpleService, private router: Router, 
              private route: ActivatedRoute, private cd: ChangeDetectorRef, private languageService: LanguageService,
              private loadingService: LoadingService) {
    this.route.queryParams.subscribe(params => {
      if(params.text) {
        setTimeout(() => {
          this.text = params.text || "";
          this.cd.detectChanges();
          this.router.navigate(['']);
        }, 0)
      }      
    })
  }

  public simplifyText() {
    console.log("simplifying...", this.text);
    this.loadingService.startLoading({message: this.getTemplate('simplifying')});
    this.simpleService.getSimplifiedText(this.text).subscribe(result => {
      this.simpleService.setResult(result);
      this.router.navigate(['simplified-text']);
    }, () => {
      //FOR TEST PURPOSES
      
    }).add(() => this.loadingService.stopLoading());
  }

  public changeLanguage() {
    this.languageService.selectNextLanguage();
  }

  public getSelectedLanguage() {
    return this.languageService.getSelectedLanguage();
  }

  public clearText() {
    this.text = '';
  }

  public async getExampleText() {
    const popover = await this.popoverCtrl.create({
      component: ExamplesList
    });
    await popover.present();
    const {data} = await popover.onDidDismiss()
    if(!data) return;
    this.loadingService.startLoading({message: this.languageService.getTemplate('examples', 'loading')})
    this.simpleService.getExampleText(data).subscribe(text => {
      this.text = text || '';
    }).add(() => this.loadingService.stopLoading());
  }

  public getTemplate(key: string): string {
    return this.languageService.getTemplate('text', key)
  }
}
