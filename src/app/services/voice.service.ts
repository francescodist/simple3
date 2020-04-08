import { Injectable } from "@angular/core";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { Observable } from 'rxjs';
import { LanguageService } from './language.service';

@Injectable({
    providedIn: "root"
})
export class VoiceService {
    constructor(private speechRecognition: SpeechRecognition, private languageService: LanguageService) {
        this.speechRecognition.hasPermission()
            .then((hasPermission: boolean) => {
                if (!hasPermission) {
                    this.speechRecognition.requestPermission();
                }
            });
    }

    public startRecording(): Observable<string[]> {
        const language = this.languageService.getSelectedLanguage() === "IT" ? "it-IT" : "en-US";
        return this.speechRecognition.startListening({ language });
    }

    public stopRecording() {
        this.speechRecognition.stopListening();
    }
}