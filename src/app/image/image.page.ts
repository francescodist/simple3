import { Component } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { TextService } from '../services/text.service';

@Component({
  selector: 'app-image',
  templateUrl: 'image.page.html',
  styleUrls: ['image.page.scss']
})
export class ImagePage {

  constructor(private cameraService: CameraService, private route: Router, private languageService: LanguageService,
    private textService: TextService) { }

  public async getImage(source: "gallery" | "camera") {
    const text = await this.cameraService.getPicture(source);
    if (text) {
      this.textService.setText(text);
      this.route.navigate(['tabs', 'text']);
    }
  }

  getTemplate(key: string): string {
    return this.languageService.getTemplate('image', key);
  }

}
