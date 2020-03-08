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
    options.duration = options.duration || 10000;
    this.loading = await this.loadingController.create(options);
    this.loading.present();
  }

  public stopLoading() {
    this.loading.dismiss();
  }

}

