import { Component } from '@angular/core';
import { VoiceService } from '../services/voice.service';

@Component({
  selector: 'app-voice',
  templateUrl: 'voice.page.html',
  styleUrls: ['voice.page.scss']
})
export class VoicePage {
  isRecording = false;
  constructor(private voiceService: VoiceService) {}

  public startRecording() {
    this.isRecording = true;
    this.voiceService.startRecording()
  }

  public stopRecording() {
    this.isRecording = false;
  }

  public getRecordText(): string {
    return this.isRecording ? 'Interrompi Registrazione' : 'Avvia Registrazione';
  }
}
