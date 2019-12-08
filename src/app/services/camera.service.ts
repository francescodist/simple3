import { Injectable } from "@angular/core";
import { Camera } from "@ionic-native/camera/ngx";

@Injectable({
  providedIn: "root"
})
export class CameraService {
  options: CameraOptions;

  constructor(private camera: Camera) {
    this.options = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
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
    } catch (e) {}
  }
}
