import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SimplifiedResult, SimplifiedTerm } from "../models/simplified-term";
import { LanguageService, Language } from './language.service';
import { TextService } from './text.service';

@Injectable({
  providedIn: "root"
})
export class SimpleService {

  private result: SimplifiedResult;

  languageMap: { [key in Language]: string } = {
    IT: 'ita',
    EN: 'eng'
  }

  constructor(private http: HttpClient, private languageService: LanguageService, private textService: TextService) { }

  public getSimplifiedText(): Observable<SimplifiedResult> {
    const language = this.languageMap[this.languageService.getSelectedLanguage()];
    const params = new HttpParams()
      .set("type", "json");
    const body = new FormData();
    body.append('textaraea', this.textService.getText().split(/\n/).join(' %0A '));
    const responseType = 'json';
    const simpleServiceURL = `http://193.1.97.172/simplehealth/simple3/service/${language}/`
    return this.http.post<any>(simpleServiceURL, body, { params, responseType });
  }

  public setResult(result: SimplifiedResult) {
    this.result = result;
  }

  public getResult(): SimplifiedTerm[] {
    return this.result[0].contenuto;
  }

  public getExampleText(ref: string) {
    const params = new HttpParams()
      .set("ref", ref);
    const responseType = 'text';
    return this.http.get("https://www.math.unipa.it/simplehealth/ita/simple/reports.php", { params, responseType });
  }
}
