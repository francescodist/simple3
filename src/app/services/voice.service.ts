import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';

@Injectable({
  providedIn: "root"
})
export class VoiceService {
    constructor(private speechRecognition: SpeechRecognition) {}

    public startRecording() {
        this.speechRecognition.startListening()
            .subscribe(
                (matches: string[]) => alert(matches),
                (onerror) => console.log('error:', onerror)
            )
    }

    public stopRecording() {

    }
}