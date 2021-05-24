import { Injectable } from "@angular/core";
import { LoadingController } from '@ionic/angular';
import { LoadingOptions } from '@ionic/core';
import { Observable, Subscription, Subject } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class LoadingService {

  loading: HTMLIonLoadingElement;

  constructor(private loadingController: LoadingController) { }

  public async startLoading(options: LoadingOptions = {}) {
    const cancel: Subject<void> = new Subject<void>();;
    options.duration = options.duration || 9990000;
    try {
      await this.loading.dismiss();
    } catch { }
    this.loading = await this.loadingController.create({ ...options, backdropDismiss: true });
    await this.loading.present();
    this.loading.onWillDismiss().then(() => {
      cancel.next();
      cancel.complete();
    })
    return cancel;
  }

  public stopLoading() {
    setTimeout(() => {
      try {
        this.loading.dismiss();
      } catch { }
    }, 50)
  }

}

