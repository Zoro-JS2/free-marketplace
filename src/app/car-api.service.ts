import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarApiService {
  constructor(private http: HttpClient) {}

  getMakes(): Observable<string[]> {
    const url = 'https://www.carqueryapi.com/api/0.3/?cmd=getMakes';
    return this.http.get<any>(url, { responseType: 'text' as 'json' }).pipe(
      map((res: string) => {
        const json = JSON.parse(res.replace('var carquery = ', '').trim());
        return json.Makes.map((m: any) => m.make_display.toLowerCase());
      })
    );
  }

  getModels(make: string): Observable<string[]> {
    const url = `https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${make}`;
    return this.http.get<any>(url, { responseType: 'text' as 'json' }).pipe(
      map((res: string) => {
        const json = JSON.parse(res.replace('var carquery = ', '').trim());
        return json.Models.map((m: any) =>
          m.model_name.toLowerCase().replace(/\s/g, '')
        );
      })
    );
  }
}
