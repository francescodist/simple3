import { Component } from '@angular/core';
import { VoiceService } from '../services/voice.service';
import { Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { TextService } from '../services/text.service';

@Component({
  selector: 'app-voice',
  templateUrl: 'voice.page.html',
  styleUrls: ['voice.page.scss']
})
export class VoicePage {
  isRecording = false;
  constructor(private voiceService: VoiceService, private route: Router, private languageService: LanguageService,
    private textService: TextService) { }

  public startRecording() {
    this.isRecording = true;
    this.voiceService.startRecording().subscribe(matches => {
      if (matches && matches[0]) {
        const text = matches[0];
        this.isRecording = false;
        this.textService.setText(text);
        this.route.navigate(['tabs', 'text']);
      }
    }).add(() => this.isRecording = false)
  }

  public stopRecording() {
    this.voiceService.stopRecording();
  }

  public getRecordText(): string {
    const key = this.isRecording ? 'stopRecording' : 'startRecording'
    return this.getTemplate(key);
  }

  getTemplate(key: string): string {
    return this.languageService.getTemplate('voice', key);
  }
}
