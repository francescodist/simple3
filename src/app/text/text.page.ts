import { Component, ChangeDetectorRef } from "@angular/core";
import { SimpleService } from "../services/simple.service";
import { Router, ActivatedRoute } from '@angular/router';
import { SimplifiedResult } from '../models/simplified-term';

@Component({
  selector: "app-text",
  templateUrl: "text.page.html",
  styleUrls: ["text.page.scss"]
})
export class TextPage {
  public text = "";
  public languages = ["IT","EN"];
  constructor(private simpleService: SimpleService, private router: Router, private route: ActivatedRoute, private cd: ChangeDetectorRef) {
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
      const result: SimplifiedResult = [{"contenuto":[{"testo":"epistassi ","semplificazione":"Sanguinamento dal naso","definizione":"\n\r\n\rDef.CUI(C0014591):Detta anche rinorragia,o pi\u00f9 semplicemente sangue dal naso, l`epistassi pu\u00f2 verificarsi senza causa apparente (epistassi essenziale) o come sintomo di un`affezione locale o generale (epistassi secondaria).Il pi\u00f9 delle volte, specie in pazienti giovani, l`emorragia \u00e8 dovuta a rottura spontanea dei piccoli vasi della muscosa nasale, in seguito a irritazione o a piccoli traumi (raffreddore, manovre maldestre con le dita, riniti, modificazioni ormonali tipiche della pubert\u00e0 ecc.).Pi\u00f9 raramente, e soprattutto negli anziani, il sangue dal naso pu\u00f2 essere sintomo di un malessere severo.Tratto da http:\/\/www.my-personaltrainer.it\/salute\/sangue-naso-epistassi.html"},{"testo":"ciao ","semplificazione":"hawaii","definizione":null}]}];
      this.simpleService.setResult(result);
      this.router.navigate(['simplified-text']);
    });
  }

  public changeLanguage() {
    this.languages.push(this.languages.shift());
  }
}
