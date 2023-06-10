import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'http://api.worldbank.org/v2';

  constructor(private http: HttpClient) { }

  getCountryInformation(countryName: string): Observable<any> {
    const url = `http://api.worldbank.org/v2/country/${countryName}?format=json`;
  
    return this.http.get<any>(url);
  
  }
}
