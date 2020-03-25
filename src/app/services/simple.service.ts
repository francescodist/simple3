import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SimplifiedResult, SimplifiedTerm } from "../models/simplified-term";
import { LanguageService, Language } from './language.service';

@Injectable({
  providedIn: "root"
})
export class SimpleService {

  private result: SimplifiedResult;

  languageMap: { [key in Language]: string } = {
    IT: 'ita',
    EN: 'eng'
  }

  constructor(private http: HttpClient, private languageService: LanguageService) { }

  public getSimplifiedText(text: string): Observable<SimplifiedResult> {
    const language = this.languageMap[this.languageService.getSelectedLanguage()];
    const params = new HttpParams()
      .set("textaraea", text.split(/\n/).join(' '))
      .set("type", "json");
    const responseType = 'json'
    return this.http.get<SimplifiedResult>(
      `https://www.math.unipa.it/simplehealth/simple/service/${language}/`,
      { params, responseType }
    );
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
