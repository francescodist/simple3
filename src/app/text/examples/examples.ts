import { Component } from "@angular/core";
import { PopoverController } from '@ionic/angular';

@Component({
    templateUrl: './examples.html'
})
export class ExamplesList {
    exampleRefs: string[];
    constructor(public popoverCtrl: PopoverController) {
        this.exampleRefs = new Array(10).fill(1).map((n, index) => n + index + '');
    }

    close(option: string) {
        this.popoverCtrl.dismiss(option);
    }
}