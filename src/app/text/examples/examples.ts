import { Component } from "@angular/core";
import { PopoverController, NavParams } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';
import { HttpClient } from '@angular/common/http';

@Component({
    templateUrl: './examples.html'
})
export class ExamplesList {
    exampleRefs: string[] = [];
    constructor(public popoverCtrl: PopoverController, private languageService: LanguageService, public http: HttpClient, public navParams: NavParams) {
        this.exampleRefs = navParams.get("examples");
    }

    close(option: string) {
        this.popoverCtrl.dismiss(option);
    }

    getTemplate(key: string): string {
        return this.languageService.getTemplate('examples', key);
    }


}