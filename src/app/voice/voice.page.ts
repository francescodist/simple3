import { Component } from '@angular/core';
import { VoiceService } from '../services/voice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-voice',
  templateUrl: 'voice.page.html',
  styleUrls: ['voice.page.scss']
})
export class VoicePage {
  isRecording = false;
  constructor(private voiceService: VoiceService, private route: Router) {}

  public startRecording() {
    this.isRecording = true;
    this.voiceService.startRecording().subscribe(matches => {
      const text = matches[0];
      if(matches && matches[0]) {
        this.isRecording = false;
        this.route.navigate(['tabs','text'], {queryParams: {text}});
      }
    }).add(() => this.isRecording = false)
  }

  public stopRecording() {
    this.voiceService.stopRecording();
  }

  public getRecordText(): string {
    return this.isRecording ? 'Interrompi Registrazione' : 'Avvia Registrazione';
  }
}
