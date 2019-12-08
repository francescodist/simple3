import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { SimplifiedResult } from "../models/simplified-term";

@Injectable({
  providedIn: "root"
})
export class SimpleService {
  constructor(private http: HttpClient) {}

  public getSimplifiedText(text: string): Observable<SimplifiedResult> {
    const params = new HttpParams()
      .set("textarea", text)
      .set("type", "json");
    const headers = new HttpHeaders();
    headers.append("Access-Control-Allow-Origin", "*");
    return this.http.get<SimplifiedResult>(
      "http://www.math.unipa.it/simplehealth/simple/service/ita",
      { headers, params }
    );
  }
}
