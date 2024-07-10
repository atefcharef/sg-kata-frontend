import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NumberTransformerService {

  private apiUrl = 'http://localhost:8081/api/v1/transform';

  constructor(private http: HttpClient) { }

  transformNumber(number: number): Observable<string> {
    return this.http.get(`${this.apiUrl}/${number}`, { responseType: 'text' });
  }
}
