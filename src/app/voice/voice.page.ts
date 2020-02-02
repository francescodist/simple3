import { Component } from '@angular/core';

@Component({
  selector: 'app-voice',
  templateUrl: 'voice.page.html',
  styleUrls: ['voice.page.scss']
})
export class VoicePage {
  isRecording = false;
  constructor() {}

  public startRecording() {
    this.isRecording = true;
  }

  public stopRecording() {
    this.isRecording = false;
  }

  public getRecordText(): string {
    return this.isRecording ? 'Interrompi Registrazione' : 'Avvia Registrazione';
  }
}
