import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LanguageService } from './language.service';


@Injectable({
    providedIn: "root"
})
export class AlertService {
    constructor(private alertCtrl: AlertController, private languageService: LanguageService) { }

    public async showError(errorCode: string) {
        const header = this.languageService.getTemplate("errors", "header");
        const message = this.languageService.getTemplate("errors", errorCode);
        const alert = await this.alertCtrl.create({ header, message, buttons: ["OK"] });
        alert.present();
    }
}