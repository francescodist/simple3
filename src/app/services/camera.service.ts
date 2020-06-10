import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClient } from "@angular/common/http";
import { LoadingService } from './loading.service';
import { LanguageService } from './language.service';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: "root"
})
export class CameraService {
  options: CameraOptions;

  constructor(private camera: Camera, private http: HttpClient, private loadingService: LoadingService,
    private languageService: LanguageService, private alertService: AlertService) {
    this.options = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
    };
  }


  public async getPicture(source: "camera" | "gallery") {
    // if (this.isLoadingScheduler) return (alert('not yet'), null);
    const sourceType =
      source === "camera"
        ? this.camera.PictureSourceType.CAMERA
        : this.camera.PictureSourceType.PHOTOLIBRARY;
    try {
      const picture = await this.camera.getPicture({
        ...this.options,
        sourceType
      });
      this.loadingService.startLoading({ message: this.languageService.getTemplate('image', 'ocr'), duration: 60000 })
      const text: any = await this.ocrPicture(picture);
      this.loadingService.stopLoading();
      return text;
    } catch (e) {
      if (e === "No Image Selected") {
        this.alertService.showError('cameraNoPic');
      } else {
        this.alertService.showError('cameraNoOcr');
      }
      this.loadingService.stopLoading();
      return null;
    }
  }

  public async ocrPicture(imageUri: string) {
    let base64Image = 'data:image/jpeg;base64,' + imageUri;
    let data = { image: base64Image };
    const language = this.languageService.getSelectedLanguage() === 'IT' ? 'ita' : 'eng';
    const { text } = await this.http.post<{ text: string }>(`http://193.1.97.172/ocr/${language}`, data).toPromise();
    return text;
  }
}
