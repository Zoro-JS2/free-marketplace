import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CarApiService {
  private baseUrl = 'http://localhost:3000/api/cars';

  constructor(private http: HttpClient) {}

  getCars(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  addCar(brand: string, model: string): Observable<any> {
    return this.http.post(this.baseUrl, { brand, model });
  }

  deleteModel(brand: string, model: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${brand}/${model}`);
  }
}
