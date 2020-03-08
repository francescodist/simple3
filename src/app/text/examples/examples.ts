import { Component } from "@angular/core";
import { PopoverController } from '@ionic/angular';
import { LanguageService } from 'src/app/services/language.service';

@Component({
    templateUrl: './examples.html'
})
export class ExamplesList {
    exampleRefs: string[];
    constructor(public popoverCtrl: PopoverController, private languageService: LanguageService) {
        this.exampleRefs = new Array(10).fill(1).map((n, index) => n + index + '');
    }

    close(option: string) {
        this.popoverCtrl.dismiss(option);
    }

    getTemplate(key: string): string {
        return this.languageService.getTemplate('examples', key);
    }
}