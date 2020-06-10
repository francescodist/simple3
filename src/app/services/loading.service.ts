import { Injectable } from "@angular/core";
import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';

@Injectable({
  providedIn: "root"
})
export class LoadingService {

  loading: HTMLIonLoadingElement;

  constructor(private loadingController: LoadingController) { }

  public async startLoading(options: LoadingOptions = {}) {
    options.duration = options.duration || 9990000;
    try {
      await this.loading.dismiss();
    } catch { }
    this.loading = await this.loadingController.create(options);
    this.loading.present();
  }

  public stopLoading() {
    setTimeout(() => {
      try {
        this.loading.dismiss();
      } catch { }
    }, 50)
  }

}

