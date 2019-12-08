import { Component } from "@angular/core";
import { SimpleService } from "../services/simple.service";

@Component({
  selector: "app-text",
  templateUrl: "text.page.html",
  styleUrls: ["text.page.scss"]
})
export class TextPage {
  public text = "";
  constructor(private simpleService: SimpleService) {}

  public simplifyText() {
    console.log("simplifying...", this.text);
    this.simpleService.getSimplifiedText(this.text).subscribe(res => {
      console.log(res);
    });
  }
}
