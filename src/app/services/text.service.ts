import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
})
export class TextService {

    text = "";

    constructor() { };

    public getText() {
        return this.text;
    }

    public setText(newText: string) {
        this.text = newText;
    }
}