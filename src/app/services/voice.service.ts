import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class VoiceService {
    constructor(private speechRecognition: SpeechRecognition) {
        this.speechRecognition.hasPermission()
            .then((hasPermission: boolean) => {
                if (!hasPermission) {
                    this.speechRecognition.requestPermission();
                }
            });
    }

    public startRecording(): Observable<string[]> {
        return this.speechRecognition.startListening();
    }

    public stopRecording() {
        this.speechRecognition.stopListening();
    }
}