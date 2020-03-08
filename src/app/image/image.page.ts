import { Component } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-image',
  templateUrl: 'image.page.html',
  styleUrls: ['image.page.scss']
})
export class ImagePage {

  constructor(private cameraService: CameraService, private route: Router, private languageService: LanguageService) {}

  public async getImage(source: "gallery" | "camera") {
    const text = await this.cameraService.getPicture(source);
    if(text) {
      this.route.navigate(['tabs','text'], {queryParams: {text}});
    } else {
      this.route.navigate(['tabs','text'], {queryParams: {text: "ocr fallito"}});
    }
  }

  getTemplate(key: string): string {
    return this.languageService.getTemplate('image', key);
  }

}
