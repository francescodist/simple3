import { Component, ChangeDetectorRef } from "@angular/core";
import { SimpleService } from "../services/simple.service";
import { Router, ActivatedRoute } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { ExamplesList } from './examples/examples';

@Component({
  selector: "app-text",
  templateUrl: "text.page.html",
  styleUrls: ["text.page.scss"]
})
export class TextPage {
  public text = "";
  public languages = ["IT","EN"];
  public popover;
  constructor(private popoverCtrl: PopoverController,private simpleService: SimpleService, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
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
    this.simpleService.getSimplifiedText(this.text).subscribe(result => {
      this.simpleService.setResult(result);
      this.router.navigate(['simplified-text']);
    }, () => {
      //FOR TEST PURPOSES
      
    });
  }

  public changeLanguage() {
    this.languages.push(this.languages.shift());
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
    this.simpleService.getExampleText(data).subscribe(text => {
      this.text = text || '';
    })
  }
}
