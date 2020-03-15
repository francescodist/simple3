import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SimplifiedResult, SimplifiedTerm } from "../models/simplified-term";

@Injectable({
  providedIn: "root"
})
export class SimpleService {

  private result: SimplifiedResult;

  constructor(private http: HttpClient) { }

  public getSimplifiedText(text: string): Observable<SimplifiedResult> {
    const params = new HttpParams()
      .set("textaraea", text.split(/\n/).join(' '))
      .set("type", "json");
    const responseType = 'json'
    return this.http.get<SimplifiedResult>(
      "https://www.math.unipa.it/simplehealth/simple/service/ita/",
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
