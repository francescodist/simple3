import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { LoadingService } from './loading.service';
import { LanguageService } from './language.service';

@Injectable({
  providedIn: "root"
})
export class CameraService {
  options: CameraOptions;

  constructor(private camera: Camera, private http: HttpClient, private loadingService: LoadingService,
              private languageService: LanguageService) {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true
    };
  }

  public async getPicture(source: "camera" | "gallery") {
    const sourceType =
      source === "camera"
        ? this.camera.PictureSourceType.CAMERA
        : this.camera.PictureSourceType.PHOTOLIBRARY;
    try {
      const picture = await this.camera.getPicture({
        ...this.options,
        sourceType
      });
      this.loadingService.startLoading({message: this.languageService.getTemplate('image', 'ocr')})
      const result: any = await this.ocrPicture(picture).toPromise();
      this.loadingService.stopLoading();
      return result.ParsedResults[0].ParsedText;
    } catch (e) {
      return null;
    }
  }

  public ocrPicture(imageData: string) {
    const APIKEY = "8b193efa4888957";
    const base64Image = "data:image/jpeg;base64," + imageData;
    let data =
      encodeURIComponent("base64Image") + "=" + encodeURIComponent(base64Image);
    return this.http.post("https://api.ocr.space/parse/image", data, {
      headers: new HttpHeaders()
        .set("Content-Type", "application/x-www-form-urlencoded")
        .set("apikey", APIKEY)
    });
  }
}
